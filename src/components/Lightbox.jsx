import React from 'react';
import './Lightbox.css';

const Lightbox = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className={`lightbox-container ${data.image ? "max-w-[65%]" : "max-w-[80%]"}`} onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-content">
          {/* Left Side - Image */}
          {data.image && (
            <div className="lightbox-image-section">
              <img
                src={data.image}
                alt={data.title}
                className="lightbox-image"
              />
            </div>
          )}
          {data.video && (
            <div className="lightbox-video-section lg:max-w-[50%] w-full">
              <video
                src={data.video}
                poster={data.poster}
                className="lightbox-video lg:h-[25vw] w-full aspect-video border-[1px] border-[#529bbe] rounded-md backdrop-contrast-50"
                autoPlay
                muted
                loop
                controls={true}
                preload="auto"
              />
            </div>
          )}

          {/* Right Side - Text Content */}
          <div className="lightbox-text-section">
            <h2 className="lightbox-title">{data.title}</h2>
            <p className="lightbox-description">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
