import { useState } from "react";
import Button from "../ui//Button";
import TextInput from "../ui/TextInput";
import PassInput from "../ui/PassInput";
import { login, type request } from "../services/login";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [user, setUser] = useState("");

  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  async function runLogin() {
    const requestData: request = {
      username: user,
      password: pass,
    };

    try {
      const res = await login(requestData);
      console.log("Login successful:", res.token);
      toast.success("Logged in successfully");
      navigate("/users");
    } catch (err) {
      if (err instanceof Error) {
        toast.error("Username or password invalid");
        console.error("Login failed:", err.message);
      }
    }
  }

  return (
    <div className="w-full h-[100dvh] flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-5">Login to your account</h1>
      <div className="w-[50%] bg-[#eeeeee6b] px-40 py-24 flex flex-col gap-8 rounded-2xl">
        <TextInput value={user} setValue={setUser}>
          Username
        </TextInput>
        <PassInput value={pass} setValue={setPass}>
          Password
        </PassInput>
        <Button onSubmit={runLogin} />
      </div>
    </div>
  );
}

export default Login;
