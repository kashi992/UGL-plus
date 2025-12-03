import "./index.css";
import { Link } from "react-router-dom";
import uglBg from "../../../assets/images/UGL-BG.jpg";
import RightChevron from "../../../assets/images/RightChevron.jsx";

const HeroSlider = () => {

  return (
    <section className="heroWrap">
      <div className="container flex flex-col">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[50px] items-center flex-1">
          <Link to="/ugl-first-project" className="rounded-[8px]" style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 5px"}}>
            <img src={uglBg} className="h-[180px] w-full object-cover" alt="" style={{borderRadius:"inherit",borderEndEndRadius:"0",borderEndStartRadius:"0"}} />
            <div className="flex justify-between px-4 py-5 items-center bg-[#f4f4f4]" style={{borderRadius:"inherit",borderStartEndRadius:"0",borderStartStartRadius:"0"}}>
              <h4 className="text-[16px] font-semibold">UGL Project 1</h4>
            <RightChevron className="flex justify-center items-center w-[20px] h-[20px] primaryClrBg rounded-[4px] p-[3px]" iconColor="#ffffff"/>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
