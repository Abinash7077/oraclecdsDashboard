"use client";
import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [updatePassword,setUpdatePassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newPassword:'',
    confirmPassword:''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    window.location.href = "/pages/cd-dashboard/"
   /*  try {
      const response = await fetch("/api/auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if(data.Code==1){
        setCookie('AuthToken', data.data.userData.id.trim(), { path: '/',maxAge:24*60*60,sameSite:true });
        setCookie('AdminRole', data.data.adminAccess, { path: '/',maxAge:24*60*60,sameSite:true });
        setFormData({
          email: "",
          password: "",
          newPassword: "",
          confirmPassword: ""
        });
        window.location.href = "/";
      }
      else if(data.Code==3){
        setFormData({
          email: "",
          password: "",
          newPassword: "",
          confirmPassword: ""
        });
        router.push("/auth/Registration");
      }
      else{
        setUpdatePassword(false)
        setFormData({
          email: "",
          password: "",
          newPassword: "",
          confirmPassword: ""
        });
        router.push('/auth/Login')
      }
      toast(data.message);
    } catch (error) {
      toast("Error:", error.message);
    } */
  };
  return (
    <>
    
      <div
        className="h-[100vh] w-full flex bg-gradient-to-r from-purple-500 via-red-500 to-green-500 items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
      >
        <div className="w-full h-full flex items-center justify-center ">
          <div className=" md:w-[30%] px-4 w-full h-fit  text-black opacity-100 bg-white md:p-16">
            <h2 className="font-bold w-full text-center  text-[25px] font-sans mb-8">
             {updatePassword?'Update':'Login'}
            </h2>
         <div className="w-full">
              <p className="text-sm">Email</p>
              <div className="flex pb-2 items-center w-full mt-2 mb-8 border-b-2 border-solid border-gray-300 gap-2">
                <CiUser className="w-[22px] h-[22px]" />{" "}
                <input
                  type="email"
                  placeholder="Enter Your User Name"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    outline: "none",
                    border: "none",
                    bg: "transparent",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </div>
            {updatePassword?<><div className="w-full">
              <p className="text-sm">New Password</p>
              <div className="flex pb-2 items-center w-full mt-2 mb-8 border-b-2 border-solid border-gray-300 gap-2">
                <CiLock className="w-[22px] h-[22px]" />{" "}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your User Name"
                  name="oldPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  style={{
                    outline: "none",
                    border: "none",
                    bg: "transparent",
                    width: "100%",
                    height: "100%",
                  }}
                />
                {!showPassword ? (
                  <>
                    <BiHide
                      className="w-[24px] h-[24px]"
                      onClick={() => setShowPassword(true)}
                    />
                  </>
                ) : (
                  <BiShow
                    className="w-[24px] h-[24px]"
                    onClick={() => setShowPassword(false)}
                  />
                )}
              </div>
            </div></>:''}
            {updatePassword?<><div className="w-full">
              <p className="text-sm">Confirm Password</p>
              <div className="flex mt-2 mb-4 pb-2 items-center w-full border-b-2 border-solid border-gray-300 gap-2">
                <CiLock className="w-[22px] h-[22px]" />{" "}
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  style={{
                    outline: "none",
                    border: "none",
                    bg: "transparent",
                    width: "100%",
                    height: "100%",
                  }}
                />
                {!showPassword ? (
                  <>
                    <BiHide
                      className="w-[24px] h-[24px]"
                      onClick={() => setShowPassword(true)}
                    />
                  </>
                ) : (
                  <BiShow
                    className="w-[24px] h-[24px]"
                    onClick={() => setShowPassword(false)}
                  />
                )}
              </div>
            </div></>:<div className="w-full">
              <p className="text-sm">Password</p>
              <div className="flex mt-2 mb-4 pb-2 items-center w-full border-b-2 border-solid border-gray-300 gap-2">
                <CiLock className="w-[22px] h-[22px]" />{" "}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  style={{
                    outline: "none",
                    border: "none",
                    bg: "transparent",
                    width: "100%",
                    height: "100%",
                  }}
                />
                {!showPassword ? (
                  <>
                    <BiHide
                      className="w-[24px] h-[24px]"
                      onClick={() => setShowPassword(true)}
                    />
                  </>
                ) : (
                  <BiShow
                    className="w-[24px] h-[24px]"
                    onClick={() => setShowPassword(false)}
                  />
                )}
              </div>
            </div>}
            {!updatePassword?<><div className="w-full">
                <p className="text-sm">
                  Forgot Password ?{" "}
                  <span className="text-blue-600 font-semibold" onClick={()=>setUpdatePassword(true)}>Reset</span>
                </p>
                <p className="text-sm">
                  New User ?{" "}
                  <span className="text-blue-600 font-semibold" onClick={()=>router.push("/auth/Registration")}>Register</span>
                </p>
            </div></>:""}
            <div className="w-full mt-6 ">
              <button
                type="button"
                style={{ width: "100%" }}
                onClick={handleSubmit}
                className="text-white bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                {updatePassword?'Update':'Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;