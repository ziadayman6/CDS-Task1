/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
// import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import AppLayout from "./pages/AppLayout";
import Users from "./pages/Users";
import Activee from "./pages/Active";
import Businesss from "./pages/Business";
import { Provider } from "react-redux";
import { store } from "./store";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const [mode, setMode] = useState("");
  const { i18n } = useTranslation();

  useEffect(() => {
    const theme = localStorage.getItem("CDStheme");
    if (theme) {
      document.documentElement.className = "";
      document.documentElement.classList.add(theme);
      setMode(theme);
    } else {
      document.documentElement.className = "";
      document.documentElement.classList.add("light");
      setMode("light");
    }
  }, []);

  useEffect(() => {
    const lang = localStorage.getItem("CDSlang");
    if (lang) {
      i18n.changeLanguage(lang);
    }

    document.documentElement.dir = lang == "ar" ? "rtl" : "ltr";
  }, [i18n]);

  const router = createBrowserRouter([
    {
      element: <Login />,
      path: "/",
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          element: <AppLayout />,
          children: [
            { element: <Users />, path: "/users" },
            { element: <Activee />, path: "/active-directory" },
            { element: <Businesss />, path: "/business" },
          ],
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "lightgray",
            color: "black",
          },
        }}
      />
    </Provider>
  );
}

export default App;
