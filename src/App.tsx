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

function App() {
  const router = createBrowserRouter([
    {
      element: <Login />,
      path: "/",
    },
    {
      element: <AppLayout />,
      children: [
        { element: <Users />, path: "/users" },
        { element: <Activee />, path: "/active-directory" },
        { element: <Businesss />, path: "/business" },
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
