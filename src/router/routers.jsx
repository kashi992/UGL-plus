import { Routes,Route} from "react-router-dom"
import HomePage from "../pages/home-page/HomePage"
import LoginForm from "../pages/login-page"
import UglFirstProject from "../pages/home-page/UglFirstProject"
import HeroSlider from "../pages/home-page/heroSlider"

const Routers = () => {
  return (
  <Routes>
    <Route index element={<HomePage/>} />
    <Route path="/login" element={<LoginForm/>} />
    <Route path="/home" element={<HeroSlider/>} />
    <Route path="/ugl-first-project" element={<UglFirstProject/>} />
  </Routes>
  )
}

export default Routers
