import { useLoginMutation } from "@shared/api/authApi";
import { setCredentials } from "@shared/store/authSlice";
import { useDispatch } from "react-redux";
import FormWrapper from "@shared/components/FormWrapper";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";
import { loginSchema } from "@shared/utils/yupSchemas";

export default function Login() {
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (data: { username: string; password: string }) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials({ token: res.token, user: { username: data.username } }));
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded">
      <h2 className="text-lg font-bold mb-4">Login</h2>
      <FormWrapper schema={loginSchema} onSubmit={handleSubmit} defaultValues={{ username: "", password: "" }}>
        <Input name="username" label="Username" />
        <Input name="password" label="Password" type="password" />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </FormWrapper>
      {error && <p className="text-red-600 mt-2">Invalid credentials</p>}
    </div>
  );
}
