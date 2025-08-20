import FormWrapper from "@shared/components/FormWrapper";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";
import * as yup from "yup";

const registerSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export default function Register() {
  const handleSubmit = (data: any) => {
    console.log("Register user", data);
    // call addUser mutation if needed
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded">
      <h2 className="text-lg font-bold mb-4">Register</h2>
      <FormWrapper schema={registerSchema} onSubmit={handleSubmit}>
        <Input name="username" label="Username" />
        <Input name="email" label="Email" />
        <Input name="password" label="Password" type="password" />
        <Button type="submit">Register</Button>
      </FormWrapper>
    </div>
  );
}
