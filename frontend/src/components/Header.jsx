import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import AuthContext from "../context/AuthContext";

function Header() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const [search,setSearch] = useState(searchInput?.search?.split("=")[1]);

  async function handleLogout() {
    const fetchData = await fetch(summaryApi.logoutUser.url, {
      method: summaryApi.logoutUser.method,
      credentials: "include",
    });

    const userData = await fetchData.json();
    if (userData.success) {
      toast.success(userData.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (userData.error) {
      toast.error(userData.message);
    }
  }

  function handleSearch(e) {
      const {value} = e.target;
      setSearch(value);
      if(value) {
        navigate(`/search?q=${value}`);
      }
      else {
        navigate("/search")
      }
  }

  return (
    <header>
      <div className="h-16 shadow-md bg-white fixed w-full z-40">
        <div className="h-full container mx-auto flex items-center justify-between">
          <div className="">
            {/* <Link to="/">
              <Logo w={90} h={50} />
            </Link> */}
            <Link to="/" className="font-bold text-3xl">
              LOGO
            </Link>
          </div>
          <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
            <input
              type="text"
              placeholder="search product here.."
              className="w-full outline-none pl-2"
              onChange={handleSearch} 
              value={search}
            />
            <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
              <GrSearch />
            </div>
          </div>
          <div className="flex items-center gap-7">
            <div className="relative flex justify-center">
              {user?._id && (
                <div
                  className="text-3xl cursor-pointer relative flex justify-center"
                  onClick={() => setMenuDisplay((prev) => !prev)}
                >
                  {user?.profileImage ? (
                    <img
                      src={user?.profileImage}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <FaRegCircleUser />
                  )}
                </div>
              )}

              {menuDisplay && user?.role === ROLE.ADMIN && (
                <div className="absolute hidden md:block bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                  <nav>
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to="/admin-panel/all-products"
                        className="whitespace-nowrap hover:bg-slate-200 p-2 rounded"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        Admin Panel
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </div>
            {user?._id && (
              <Link to="/cart" className="text-3xl cursor-pointe relative">
                <span>
                  <FaCartShopping />
                </span>
                <div className="bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3">
                  <p className="text-sm">{context?.cartProductCount}</p>
                </div>
              </Link>
            )}

            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to="login"
                className="px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
