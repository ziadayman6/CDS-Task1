import { useState } from "react";
import Button from "../ui//Button";
import TextInput from "../ui/TextInput";
import PassInput from "../ui/PassInput";
import { login, type request } from "../services/login";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("CDS1-token");

  async function runLogin() {
    setIsLoading(true);
    const requestData: request = {
      username: "admin",
      password: "password",
    };

    try {
      const res = await login(requestData);
      console.log("Login successful:", res.token);
      toast.success("Logged in successfully");
      setIsLoading(false);
      navigate("/users");
    } catch (err) {
      if (err instanceof Error) {
        toast.error("Username or password invalid");
        setIsLoading(false);
      }
    }
  }

  if (isAuthenticated) return <Navigate to="/users" replace />;

  return (
    <div className="w-full h-[100dvh] flex flex-col justify-center items-center dark:bg-[#0f181f]">
      <h1 className="text-3xl mb-5 max-sm:text-2xl dark:text-white">
        {t("loginToAcc")}
      </h1>
      <div className="w-[50%] max-sm:w-[90%] bg-[#eeeeee6b] px-40 max-sm:px-10 py-24 flex flex-col gap-8 rounded-2xl dark:bg-[#1a273b]">
        {isLoading ? (
          <div className="flex justify-center ">
            <ClipLoader
              color="#f0b100"
              size={50}
              aria-label="Loading Spinner"
            />
          </div>
        ) : (
          <>
            <TextInput value={user} setValue={setUser}>
              {t("username")}
            </TextInput>
            <PassInput value={pass} setValue={setPass}>
              {t("pass")}
            </PassInput>
            <Button onSubmit={runLogin}>{t("login")}</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
