// src/components/VideoExperience.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { scenes, allVideoUrls } from "../data/scenes";
import Hotspot from "./Hotspot";
import "./VideoExperience.css";

const OVERLAY_FADE_TIME = 0.25; // seconds

const VideoExperience = () => {
  const [activeSceneId, setActiveSceneId] = useState("main");

  const [overlaySrc, setOverlaySrc] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [pendingBaseSceneId, setPendingBaseSceneId] = useState(null);

  // NEW: is this overlay a transition or a detail video?
  const [overlayMode, setOverlayMode] = useState(null); // "transition" | "detailVideo" | null

  const [activeDetailHotspot, setActiveDetailHotspot] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  // preload
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState(0); // optional % display

  const activeScene = scenes[activeSceneId];

  const isMain = activeSceneId === "main";
  const showMainHotspots = isMain && !overlayVisible;
  const showDetailHotspots =
    !isMain && !overlayVisible && Array.isArray(activeScene.detailHotspots);
  const showBackButton =
    !isMain && !overlayVisible && !!activeScene.back;

  // 🔹 GLOBAL PRELOAD of all important videos
  useEffect(() => {
    let cancelled = false;

    async function preloadVideos() {
      const urls = allVideoUrls;
      let loadedCount = 0;

      const promises = urls.map(
        (url) =>
          new Promise((resolve) => {
            const video = document.createElement("video");
            video.src = url;
            video.preload = "auto";

            const onReady = () => {
              loadedCount += 1;
              if (!cancelled) {
                setPreloadProgress(
                  Math.round((loadedCount / urls.length) * 100)
                );
              }
              cleanup();
              resolve();
            };

            const onError = () => {
              // Even on error we count it, so loader doesn't hang forever
              loadedCount += 1;
              if (!cancelled) {
                setPreloadProgress(
                  Math.round((loadedCount / urls.length) * 100)
                );
              }
              cleanup();
              resolve();
            };

            const cleanup = () => {
              video.removeEventListener("canplaythrough", onReady);
              video.removeEventListener("loadeddata", onReady);
              video.removeEventListener("error", onError);
            };

            video.addEventListener("canplaythrough", onReady);
            video.addEventListener("loadeddata", onReady);
            video.addEventListener("error", onError);
          })
      );

      await Promise.all(promises);
      if (!cancelled) {
        setIsPreloaded(true);
      }
    }

    preloadVideos();

    return () => {
      cancelled = true;
    };
  }, []);

  // 🔹 Main Hotspot click → transition IN
  const handleHotspotClick = (hotspot) => {
    if (overlayVisible) return;

    setPendingBaseSceneId(hotspot.targetSceneId);

    setOverlaySrc(hotspot.transitionIn);
    setOverlayMode("transition");
    setOverlayVisible(true);

    setTimeout(() => {
      setActiveSceneId(hotspot.targetSceneId);
      setPendingBaseSceneId(null);
    }, OVERLAY_FADE_TIME * 1000 + 20);
  };

  // 🔹 Back click → transition OUT
  const handleBackClick = () => {
    if (overlayVisible) return;
    if (!activeScene.back) return;

    const { transitionOut, targetSceneId } = activeScene.back;

    setPendingBaseSceneId(targetSceneId);
    setOverlaySrc(transitionOut);
    setOverlayMode("transition");
    setOverlayVisible(true);

    setTimeout(() => {
      setActiveSceneId(targetSceneId);
      setPendingBaseSceneId(null);
    }, OVERLAY_FADE_TIME * 1000 + 20);
  };

  // 🔹 Overlay ENDED → only for transitions
  const handleOverlayEnded = () => {
    if (overlayMode === "transition") {
      setOverlayVisible(false);
      setOverlayMode(null);
      // optional: setOverlaySrc(null);
    }
  };

  // 🔹 Detail hotspot (inside destination scene)
  const handleDetailHotspotClick = (hotspot) => {
    if (overlayVisible) return;

    if (hotspot.type === "modal") {
      setActiveDetailHotspot(hotspot);
      setIsInfoModalOpen(true);
    } else if (hotspot.type === "video") {
      // Detail overlay video → LOOP and DO NOT auto-hide
      setOverlaySrc(hotspot.videoSrc);
      setOverlayMode("detailVideo");
      setOverlayVisible(true);
    }
  };

  // Close button for detail video overlay
  const handleCloseDetailVideo = () => {
    if (overlayMode === "detailVideo") {
      setOverlayVisible(false);
      setOverlayMode(null);
      // optional: setOverlaySrc(null);
    }
  };

  // 🔹 PRELOADER SCREEN
  if (!isPreloaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-white animate-spin" />
          <div className="text-sm tracking-wide uppercase">
            Loading experience… {preloadProgress}%
          </div>
        </div>
      </div>
    );
  }

  // 🔹 MAIN EXPERIENCE UI
  return (
    <div className="bg-black flex items-center justify-center VideoExperienceWrap">
      <div className="relative w-full aspect-[16/9] overflow-hidden h-full">
        {/* BASE LAYER: all scene videos preloaded & looping */}
        {Object.values(scenes).map((scene) => (
          <video
            key={scene.id}
            src={scene.videoSrc}
            className="absolute inset-0 w-full h-full left-0 top-0 right-0 bottom-0 object-cover"
            autoPlay={scene.id === activeSceneId}
            muted
            loop
            preload={scene.id === activeSceneId ? "auto" : "metadata"}
            style={{
              opacity: scene.id === activeSceneId ? 1 : 0,
              transition: "opacity 0s linear",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* OVERLAY: used for both transitions and detail videos */}
        {overlaySrc && (
          <>
            <motion.video
              key={overlaySrc}
              src={overlaySrc}
              className="absolute inset-0 w-full h-full left-0 top-0 right-0 bottom-0 object-cover"
              autoPlay
              muted
              loop={overlayMode === "detailVideo"} // Loop ONLY when it's a detail video
              onEnded={
                overlayMode === "transition" ? handleOverlayEnded : undefined
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: overlayVisible ? 1 : 0 }}
              transition={{ duration: OVERLAY_FADE_TIME }}
              preload="metadata"
            />

            {/* Close button ONLY for looping detail videos */}
            {overlayMode === "detailVideo" && overlayVisible && (
              <button
                type="button"
                onClick={handleCloseDetailVideo}
                className="absolute top-4 right-4 z-20 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            )}
          </>
        )}

        {/* Main hotspots */}
        {showMainHotspots &&
          activeScene.hotspots?.map((h) => (
            <Hotspot
              key={h.id}
              x={h.x}
              y={h.y}
              label={h.label}
              onClick={() => handleHotspotClick(h)}
            />
          ))}

        {/* Detail hotspots */}
        {showDetailHotspots &&
          activeScene.detailHotspots?.map((h) => (
            <Hotspot
              key={h.id}
              x={h.x}
              y={h.y}
              label={h.label}
              onClick={() => handleDetailHotspotClick(h)}
            />
          ))}

        {/* Back button */}
        {showBackButton && (
          <button
            type="button"
            onClick={handleBackClick}
            className="absolute bottom-6 left-4 text-white rounded-[10px] min-[1600px]:text-[20px] text-[16px] z-20 secondaryClrBg border-2 border-[#184178] min-[1600px]:py-2 py-1 min-[1600px]:px-8 px-5"
          >
            Back
          </button>
        )}

        {/* Info modal for detail hotspots (type="modal") */}
        {isInfoModalOpen && activeDetailHotspot && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
            <div className="bg-white rounded-lg p-4 max-w-md w-full">
              <h2 className="font-semibold mb-2">
                {activeDetailHotspot.modalContent?.title}
              </h2>
              <p className="text-sm text-gray-700">
                {activeDetailHotspot.modalContent?.description}
              </p>
              <button
                className="mt-4 px-3 py-1 bg-black text-white text-sm rounded"
                onClick={() => {
                  setIsInfoModalOpen(false);
                  setActiveDetailHotspot(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoExperience;
