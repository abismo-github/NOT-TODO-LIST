import React from "react";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="bg-black p-7">
        <div >
          <ul className="flex item-center justify-between">
            <li>
              <Link to="/main" className="text-white hover:text-orange-600">
                {" "}
                main{" "}
              </Link>
            </li>
            <li>
              <Link
                to="/monthlycalendar"
                className="text-white hover:text-orange-600"
              >
                {" "}
                calendar{" "}
              </Link>
            </li>
            <li>
              <Link to="/summary" className="text-white hover:text-orange-600">
                {" "}
                summary{" "}
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
