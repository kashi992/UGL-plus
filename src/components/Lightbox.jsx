import React from 'react';
import './Lightbox.css';

const Lightbox = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
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
