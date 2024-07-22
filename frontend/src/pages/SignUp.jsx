import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import imageToBase64 from "../helpers/ImageToBase64";
import summaryApi from "../common";
import { toast } from "react-toastify";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    ConfirmPassword: "",
    profileImage: "",
  });
  const navigate = useNavigate();

  function handelOnChange(e) {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleUploadPic(e) {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);

    setData((prev) => {
      return {
        ...prev,
        profileImage: imagePic,
      };
    });
    console.log("imagePic", imagePic);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (data.password === data.ConfirmPassword) {
      const responseData = await fetch(summaryApi.signUp.url, {
        method: summaryApi.signUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await responseData.json();
      if(resData.success) {
        toast.success(resData.message);
        navigate("/login");
      }
      if(resData.error) {
        toast.error(resData.message);
      }

      console.log(resData);
    } else {
      toast.error("Please check password and confirm password");
    }
  }

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-md mx-auto rounded">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div className="">
              <img src={data.profileImage || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-sm font-semibold bg-opacity-70 cursor-pointer bg-slate-200 py-3 text-center absolute bottom-0 w-full">
                  Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name: </label>
              <div className="bg-slate-100 p-2 rounded">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={data.name}
                  onChange={handelOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                ></input>
              </div>
            </div>

            <div className="grid">
              <label>Email: </label>
              <div className="bg-slate-100 p-2 rounded">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={data.email}
                  onChange={handelOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                ></input>
              </div>
            </div>

            <div className="">
              <label>Password: </label>
              <div className="bg-slate-100 p-2 rounded flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={handelOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                ></input>
                <div
                  className="cursor-pointer text-xl"
                  onClick={() =>
                    setShowPassword((prevPassword) => !prevPassword)
                  }
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
            </div>

            <div className="">
              <label>Confirm Password: </label>
              <div className="bg-slate-100 p-2 rounded flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="ConfirmPassword"
                  value={data.ConfirmPassword}
                  onChange={handelOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                ></input>
                <div
                  className="cursor-pointer text-xl"
                  onClick={() =>
                    setShowConfirmPassword((prevPassword) => !prevPassword)
                  }
                >
                  <span>
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sign Up
            </button>
          </form>

          <p className="my-4">
            Already have account ?{" "}
            <Link
              to="/login"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
