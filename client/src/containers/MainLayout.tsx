import { Navbar, Footer } from "../components";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default MainLayout;
