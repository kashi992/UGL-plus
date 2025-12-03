import "./navbar.css";
import mainLogo from "../../assets/images/main-logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <header className="bg-white">
      <div className="container">
        <Link to="/home" className="min-[1680px]:h-[78px] min-[1370px]:h-[72px] min-[991px]:h-[50px] h-[30px]">
          <img src={mainLogo} alt="" className="h-full" />
        </Link>
       <button className="w-[35px] h-[1px] bg-[#184178] block"></button>
      </div>
    </header>
  );
};

export default Navbar;
