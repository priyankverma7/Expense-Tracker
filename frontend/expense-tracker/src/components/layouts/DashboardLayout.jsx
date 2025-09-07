import React,{useContext} from "react";
import { UserContext } from "../../context/UserContext";
import { Children } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import Home from "../../pages/Dashboard/Home";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1000px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};


export default DashboardLayout;

