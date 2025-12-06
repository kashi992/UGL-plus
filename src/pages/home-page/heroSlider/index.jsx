import "./index.css";
import { Link } from "react-router-dom";
import uglBg from "../../../assets/images/UGL-BG.jpg";
import RightChevron from "../../../assets/images/RightChevron.jsx";

const uglArr = [
  {
    id: 1,
    to: "/ugl-first-project",
    uglBg: uglBg,
    title: "UGL Project 1",
  },
  {
    id: 2,
    to: "",
    uglBg: "",
    title: "UGL Project 2",
  },
  {
    id: 3,
    to: "",
    uglBg: "",
    title: "UGL Project 3",
  },
  {
    id: 4,
    to: "",
    uglBg: "",
    title: "UGL Project 4",
  },
  {
    id: 5,
    to: "",
    uglBg: "",
    title: "UGL Project 5",
  },
];
const HeroSlider = () => {

  return (
    <section className="heroWrap">
      <div className="container flex flex-col">
        <div className="grid grid-cols-2 md:grid-cols-4 min-[1370px]:gap-10 gap-6 items-center flex-1 content-center">
          {uglArr.map((data) => (
            <Link key={data.id} to={data.to} className="rounded-[8px]" style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 5px" }}>
              <div className="min-[1370px]:h-[180px] h-[150px] w-full bg-gray-500" style={{ borderRadius: "inherit", borderEndEndRadius: "0", borderEndStartRadius: "0" }}>
                {
                  data.uglBg &&
                    <img src={data.uglBg} className="h-full w-full object-cover" alt="" style={{ borderRadius: "inherit", borderEndEndRadius: "0", borderEndStartRadius: "0" }} />
                }
              </div>
              <div className="flex justify-between min-[1370px]:px-4 min-[1370px]:py-5 px-3 py-4 items-center bg-[#f4f4f4]" style={{ borderRadius: "inherit", borderStartEndRadius: "0", borderStartStartRadius: "0" }}>
                <h4 className="text-[16px] font-semibold">{data.title}</h4>
                <RightChevron className="flex justify-center items-center w-[20px] h-[20px] primaryClrBg rounded-[4px] p-[3px]" iconColor="#ffffff" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
