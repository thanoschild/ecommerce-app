import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
      if(user?.role !== ROLE.ADMIN) {
        navigate("/");
      }
  }, [user])

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-80 customShadow">
        <div className="h-40 bg-red-500 flex justify-center items-center flex-col">
          <div className="text-7xl cursor-pointer relative flex justify-center">
            {user?.profileImage ? (
              <img
                src={user?.profileImage}
                alt={user?.name}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold text-white">
            {user?.name}
          </p>
          <p className="text-sm text-white">{user?.role}</p>
        </div>
        <div>
          <nav className="grid p-6 items-center">
            <Link
              to="all-users"
              className="h-10 px-2 py-2 items-center hover:bg-slate-100 text-lg rounded-lg"
            >
              All users
            </Link>
            <Link
              to="all-products"
              className="h-10 px-2 py-1 items-center hover:bg-slate-100 text-lg rounded-lg"
            >
              Product
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;
