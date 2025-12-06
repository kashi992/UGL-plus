// src/data/scenes.js
const home1 = "https://dx7w9sbbk48t1.cloudfront.net/Home1.mp4";
const transitionMainToSection1 = "https://dx7w9sbbk48t1.cloudfront.net/Tranistions.mp4";
const home2 = "https://dx7w9sbbk48t1.cloudfront.net/Image_to_Video_END.mp4";
const transitionSection1ToMain = "https://dx7w9sbbk48t1.cloudfront.net/Tranistions-out.mp4";
const UGLServices3_asset1 = "https://dx7w9sbbk48t1.cloudfront.net/Electrical.mp4";
const UGLServices3_asset2 = "https://dx7w9sbbk48t1.cloudfront.net/Mechanical.mp4";
import uglBG from "../assets/images/UGL-BG.jpg";
import electricalImage from "../assets/images/electrical_machine.png";

export const scenes = {
  // main (if you still use it later)
  main: {
    id: "main",
    title: "Main Overview",
    videoSrc: home1, // or home1 etc.
    loadingBg: uglBG,
    hotspots: [{
      id: "toUGLServices3",
      label: "UGL Services 3",
      x: 63,
      y: 41,
      transitionIn: transitionMainToSection1,
      targetSceneId: "UGLServices3",
    },
    ],
  },

  // DETAIL SCENE
  UGLServices3: {
    id: "UGLServices3",
    title: "UGL Services 3 Detail",
    videoSrc: home2,
    loadingBg: uglBG, // ⭐ this is used by loader
    back: {
      transitionOut: transitionSection1ToMain,
      targetSceneId: "main",
    },

    detailHotspots: [
      // Electrical VIDEO (2nd level)
      {
        id: "UGLServices3_electrical_video",
        x: 34, y: 63,
        label: "Electrical Services",
        type: "video",
        videoSrc: UGLServices3_asset1,
        // modalButtonText: "More info",
        modalContent: {
          title: "Electrical Systems",
          description: "High-voltage and low-voltage electrical infrastructure, design, installation and maintenance.",
        },

        // ⭐ 3rd-level hotspots INSIDE THIS VIDEO
        innerHotspots: [{
          id: "elec_lightbox_1",
          x: 13,
          y: 69,
          label: "3",
          title: "UGL Electrical Engineering Specialist Teams",
          description: "Our in-house specialist engineers develop designs that consider construction, maintenance and end performance objectives from the outset, reducing whole-of-life costs. \n\n They apply extensive experience to improve time and cost outcomes, minimise interface risks and ensure effective knowledge transfer from construction into ongoing operations with a continual focus on safety. \n\n Our technology and product agnostic approach, and disciplined systems engineering and integration, further guarantees best-for-project outcomes. This engineering DNA then becomes a perpetual resource through an asset's lifecycle.",
          image: electricalImage,
        },
        {
          id: "elec_lightbox_2",
          x: 48,
          y: 71,
          label: "2",
          title: "UGL Electrical Engineering Specialist Teams",
          description: "Our in-house specialist engineers develop designs that consider construction, maintenance and end performance objectives from the outset, reducing whole-of-life costs. \n\n They apply extensive experience to improve time and cost outcomes, minimise interface risks and ensure effective knowledge transfer from construction into ongoing operations with a continual focus on safety. \n\n Our technology and product agnostic approach, and disciplined systems engineering and integration, further guarantees best-for-project outcomes. This engineering DNA then becomes a perpetual resource through an asset's lifecycle.",
          image: electricalImage,
        },
        {
          id: "mech_lightbox_1",
          x: 66,
          y: 71,
          label: "1",
          title: "UGL Electrical Engineering Specialist Teams",
          description: "Our in-house specialist engineers develop designs that consider construction, maintenance and end performance objectives from the outset, reducing whole-of-life costs. \n\n They apply extensive experience to improve time and cost outcomes, minimise interface risks and ensure effective knowledge transfer from construction into ongoing operations with a continual focus on safety. \n\n Our technology and product agnostic approach, and disciplined systems engineering and integration, further guarantees best-for-project outcomes. This engineering DNA then becomes a perpetual resource through an asset’s lifecycle.",
          image: electricalImage,
        },
        ],
      },

      // Mechanical VIDEO (2nd level)
      {
        id: "UGLServices3_mechanical_video",
   x: 56, y: 38, label: "Mechanical Services",
        type: "video",
        videoSrc: UGLServices3_asset2,
        // modalButtonText: "More info",
        modalContent: {
          title: "Mechanical Systems",
          description: "Rotating equipment, piping and mechanical installations across the asset lifecycle.",
        },

        innerHotspots: [{
          id: "elec_lightbox_1",
          x: 25,
          y: 30,
          label: "3",
          title: "UGL Electrical Engineering Specialist Teams",
          description: "Our in-house specialist engineers develop designs that consider construction, maintenance and end performance objectives from the outset, reducing whole-of-life costs. \n\n They apply extensive experience to improve time and cost outcomes, minimise interface risks and ensure effective knowledge transfer from construction into ongoing operations with a continual focus on safety. \n\n Our technology and product agnostic approach, and disciplined systems engineering and integration, further guarantees best-for-project outcomes. This engineering DNA then becomes a perpetual resource through an asset's lifecycle.",
          image: electricalImage,
        },
        {
          id: "elec_lightbox_2",
          x: 60,
          y: 55,
          label: "2",
          title: "UGL Electrical Engineering Specialist Teams",
          description: "Our in-house specialist engineers develop designs that consider construction, maintenance and end performance objectives from the outset, reducing whole-of-life costs. \n\n They apply extensive experience to improve time and cost outcomes, minimise interface risks and ensure effective knowledge transfer from construction into ongoing operations with a continual focus on safety. \n\n Our technology and product agnostic approach, and disciplined systems engineering and integration, further guarantees best-for-project outcomes. This engineering DNA then becomes a perpetual resource through an asset's lifecycle.",
          image: electricalImage,
        },{
          id: "mech_lightbox_1",
          x: 40,
          y: 35,
          label: "1",
          title: "UGL Electrical Engineering Specialist Teams",
          description: "Our in-house specialist engineers develop designs that consider construction, maintenance and end performance objectives from the outset, reducing whole-of-life costs. \n\n They apply extensive experience to improve time and cost outcomes, minimise interface risks and ensure effective knowledge transfer from construction into ongoing operations with a continual focus on safety. \n\n Our technology and product agnostic approach, and disciplined systems engineering and integration, further guarantees best-for-project outcomes. This engineering DNA then becomes a perpetual resource through an asset’s lifecycle.",
          image: electricalImage,
        },],
      },
    ],
  },
};