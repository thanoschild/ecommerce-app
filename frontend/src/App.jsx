import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import summaryApi from "./common";
import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount,setCartProductCount] = useState(0)

  async function fetchUserDetails() {
    const dataResponse = await fetch(summaryApi.currentUser.url, {
      method: summaryApi.currentUser.method,
      credentials: "include",
    });

    const resData = await dataResponse.json();
    if (resData.success) {
      dispatch(setUserDetails(resData.data));
    }
  }

  async function fetchCartNumber() {
    const dataResponse = await fetch(summaryApi.cartNumber.url, {
      method: summaryApi.cartNumber.method,
      credentials: "include",
    });

    const resData = await dataResponse.json();
    setCartProductCount(resData?.data?.count);
  }

  useEffect(() => {
    fetchUserDetails();
    fetchCartNumber();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ fetchUserDetails, cartProductCount, fetchCartNumber }}>
        <ToastContainer position="top-center"/>
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </AuthContext.Provider>
    </>
  );
}

export default App;
