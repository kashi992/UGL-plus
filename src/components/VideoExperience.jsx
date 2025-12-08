// src/components/VideoExperience.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scenes } from "../data/scenes";
import Hotspot from "./Hotspot";
import Lightbox from "./Lightbox";
import "./VideoExperience.css";

const OVERLAY_FADE_TIME = 0.25; // seconds

const VideoExperience = () => {
  // for now you said we start directly on UGLServices3
  const [activeSceneId, setActiveSceneId] = useState("main");

  const [overlaySrc, setOverlaySrc] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [pendingBaseSceneId, setPendingBaseSceneId] = useState(null);

  const [overlayMode, setOverlayMode] = useState(null); // "transition" | "detailVideo" | null

  const [activeDetailHotspot, setActiveDetailHotspot] = useState(null);
  const [isInfoSidebarOpen, setIsInfoSidebarOpen] = useState(false);

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // ⭐ NEW: 3rd-level lightbox state (hotspot inside detail video)
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  const activeScene = scenes[activeSceneId] || scenes.main;
  const uglBg = activeScene?.loadingBg || activeScene?.bg || "";

  const isMain = activeSceneId === "main";
  const showMainHotspots = isMain && !overlayVisible;
  const showDetailHotspots =
    !isMain && !overlayVisible && Array.isArray(activeScene.detailHotspots);
  const showBackButton =
    !isMain && !overlayVisible && !!activeScene.back;

  // ─────────────────────────────
  // MAIN HOTSPOT (scene to scene)
  // ─────────────────────────────
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

  const handleOverlayEnded = () => {
    if (overlayMode === "transition") {
      setOverlayVisible(false);
      setOverlayMode(null);
    }
  };

  // ─────────────────────────────
  // INNER HOTSPOTS (inside scene)
  // ─────────────────────────────
  const handleDetailHotspotClick = (hotspot) => {
    if (overlayVisible) return;

    if (hotspot.type === "modal") {
      // ➜ RIGHT SIDEBAR INFO (if you still want this type)
      setActiveDetailHotspot(hotspot);
      setIsInfoSidebarOpen(true);
    } else if (hotspot.type === "video") {
      // ➜ DETAIL VIDEO OVERLAY
      setActiveDetailHotspot(hotspot); // we need it for "More info" and inner hotspots
      setOverlaySrc(hotspot.videoSrc);
      setOverlayMode("detailVideo");
      setOverlayVisible(true);
      setActiveLightboxItem(null); // reset any previous lightbox
    }
  };

  const handleCloseDetailVideo = () => {
    if (overlayMode === "detailVideo") {
      setOverlayVisible(false);
      setOverlayMode(null);
      // keep activeDetailHotspot so we can still open sidebar/lightbox if needed
    }
  };

  // ─────────────────────────────
  // INNER-INNER HOTSPOTS (inside detail video)
  // ─────────────────────────────
  const handleInnerVideoHotspotClick = (item) => {
    // just open center lightbox with this item's data
    setActiveLightboxItem(item);
  };

  const closeLightbox = () => {
    setActiveLightboxItem(null);
  };

  return (
    <div className="flex items-center justify-center VideoExperienceWrap">
      <div className="relative w-full aspect-[16/9] overflow-hidden h-full">
        {/* BASE SCENE VIDEO */}
        <video
          key={activeScene.id}
          src={activeScene.videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          preload="auto"
          onCanPlayThrough={() => {
            if (isInitialLoading) setIsInitialLoading(false);
          }}
          style={{ pointerEvents: "none" }}
        />

        {/* OVERLAY VIDEOS: transitions + detail */}
        {overlaySrc && (
          <>
            <motion.video
              key={overlaySrc}
              src={overlaySrc}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop={overlayMode === "detailVideo"}
              onEnded={
                overlayMode === "transition" ? handleOverlayEnded : undefined
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: overlayVisible ? 1 : 0 }}
              transition={{ duration: OVERLAY_FADE_TIME }}
              preload="metadata"
            />

            {/* Close + More info buttons ONLY for detail video */}
            {overlayMode === "detailVideo" && overlayVisible && (
              <>
                <button
                  type="button"
                  onClick={handleCloseDetailVideo}
                  className="absolute top-4 right-4 z-20 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm"
                >
                  ✕
                </button>

                {/* "More info" button for sidebar (optional) */}
                {/* {activeDetailHotspot?.modalContent && (
                  <button
                    type="button"
                    onClick={() => setIsInfoSidebarOpen(true)}
                    className="absolute bottom-6 right-4 z-20 primaryClrBg text-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:opacity-90 transition-opacity"
                    title="More info"
                  >
                    <i className="fas fa-info text-lg"></i>
                  </button>
                )} */}

                {/* ⭐ INNER-INNER HOTSPOTS OVER DETAIL VIDEO */}
                {Array.isArray(activeDetailHotspot?.innerHotspots) &&
                  activeDetailHotspot.innerHotspots.map((h) => (
                    <Hotspot
                      key={h.id}
                      x={h.x}
                      y={h.y}
                      label={h.label}
                      onClick={() => handleInnerVideoHotspotClick(h)}
                    />
                  ))}
              </>
            )}
          </>
        )}

        {/* FIRST LOAD OVERLAY (with uglBg from scenes.js) */}
        {isInitialLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center text-white z-30"
            style={
              uglBg
                ? {
                    backgroundImage: `url(${uglBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
            }
          >
            <div
              className="flex flex-col items-center gap-3 p-6 rounded-lg"
              style={{ backdropFilter: "contrast(0.5)" }}
            >
              <div className="w-12 h-12 rounded-full border-4 border-white/40 border-t-white animate-spin" />
              <div className="text-sm tracking-wide uppercase">
                Loading…
              </div>
            </div>
          </div>
        )}

        {/* MAIN HOTSPOTS (only when active scene is 'main') */}
        {showMainHotspots &&
          activeScene.hotspots?.map((h) => (
            <Hotspot
              key={h.id}
              x={h.x}
              y={h.y}
              label={h.label}
              onClick={() => handleHotspotClick(h)}
              disabled={h.disabled}
            />
          ))}

        {/* INNER HOTSPOTS (inside UGLServices3 etc.) */}
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

        {/* BACK BUTTON (from detail scene back to main) */}
        {showBackButton && (
          <button
            type="button"
            onClick={handleBackClick}
            className="absolute bottom-6 left-4 text-white rounded-[10px] min-[1600px]:text-[20px] text-[16px] z-20 secondaryClrBg border-2 border-[#184178] min-[1600px]:py-2 py-1 min-[1600px]:px-8 px-5"
          >
            Back
          </button>
        )}

        {/* RIGHT SIDEBAR INFO (for type: modal or More info) */}
        <AnimatePresence>
          {isInfoSidebarOpen && activeDetailHotspot && (
            <motion.div
              className="fixed inset-0 z-30 flex justify-end bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="h-full w-full max-w-md bg-white shadow-2xl p-5 overflow-y-auto relative"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="font-semibold text-lg">
                    {activeDetailHotspot.modalContent?.title ||
                      activeDetailHotspot.label}
                  </h2>
                  <button
                    onClick={() => setIsInfoSidebarOpen(false)}
                    className="text-gray-500 hover:text-black text-xl leading-none"
                  >
                    ×
                  </button>
                </div>

                {activeDetailHotspot.modalContent?.description && (
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {activeDetailHotspot.modalContent.description}
                  </p>
                )}

                {activeDetailHotspot.modalContent?.points && (
                  <ul className="mt-3 list-disc list-inside text-sm text-gray-700">
                    {activeDetailHotspot.modalContent.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ⭐ CENTER LIGHTBOX FOR INNER-INNER HOTSPOTS */}
        {activeLightboxItem && (
          <Lightbox data={activeLightboxItem} onClose={closeLightbox} />
        )}
      </div>
    </div>
  );
};

export default VideoExperience;
