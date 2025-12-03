// src/data/scenes.js
const home1 = "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/UGL-plus/Home1.mp4";
const transitionMainToSection1 = "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/UGL-plus/Tranistions.mp4";
const home2 = "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/UGL-plus/Image_to_Video_END.mp4";
const transitionSection1ToMain = "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/UGL-plus/Tranistions-out.mp4";

const UGLServices3_asset1 = "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/UGL-plus/Electrical.mp4";
const UGLServices3_asset2 = "https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/UGL-plus/Mechanical.mp4";

export const scenes = {
  // 🔹 MAIN SCENE
  main: {
    id: "main",
    title: "Main Overview",
    videoSrc: home1,
    hotspots: [
      {
        id: "UGLServices3",
        label: "UGL Services 3",
        x: 63,
        y: 41,
        transitionIn: transitionMainToSection1, // transition IN video
        targetSceneId: "UGLServices3",          // destination scene
      },
      // add more hotspots if needed
    ],
  },

  // 🔹 DETAIL SCENE: UGL Services 3
  UGLServices3: {
    id: "UGLServices3",
    title: "UGL Services 3 Detail",
    videoSrc: home2, // main/detail loop video for this section

    // Back transition → main
    back: {
      transitionOut: transitionSection1ToMain, // transition OUT video
      targetSceneId: "main",
    },

    // Inner detail hotspots for this section
    detailHotspots: [
      {
        id: "UGLServices3_asset1",
        x: 30,
        y: 40,
        label: "Electrical",
        type: "video",             // handled as looping overlay video
        videoSrc: UGLServices3_asset1, // this will LOOP in overlay
        // modalContent is ignored for type: "video" but can be kept or removed
        modalContent: {
          title: "Electrical Systems",
          description: "Short description here...",
        },
      },
      {
        id: "UGLServices3_asset2",
        x: 50,
        y: 50,
        label: "Mechanical",
        type: "video",              // looping overlay again
        videoSrc: UGLServices3_asset2,
        modalContent: {
          title: "Mechanical Systems",
          description: "Short description here...",
        },
      },
    ],
  },
};
