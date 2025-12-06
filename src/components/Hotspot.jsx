// src/components/Hotspot.jsx

const Hotspot = ({ x, y, label, onClick, className, style }) => (
  <button
    className={`absolute -translate-x-1/2 -translate-y-1/2
               transition border-2 border-[#184178] rounded-[10px] min-[1600px]:py-2 py-1 min-[1600px]:px-8 px-4 ${className}`} style={{ left: `${x}%`, top: `${y}%` , ...style }}
    onClick={onClick}
    type="button"
  >
    {label && (
      <span className="text-white min-[1600px]:text-[20px] text-[16px] leading-none">
        {label}
      </span>
    )}
  </button>
);

export default Hotspot;
