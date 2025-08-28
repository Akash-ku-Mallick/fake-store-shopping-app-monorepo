import FormWrapper from "@shared/components/FormWrapper";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRegisterEmailMutation } from "@shared/api/authApi";
import Spinner from "@shared/components/ui/loader/spinner";
import toast from "react-hot-toast";

const registerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});
type registerType = yup.InferType<typeof registerSchema>

export default function Register() {
  const navigate = useNavigate()
  const [registerUser, { isLoading }] = useRegisterEmailMutation()
  const handleSubmit = (data: registerType) => {
    registerUser({
      email: data.email,
      password: data.password
    }).unwrap()
     .then((r)=>{
       toast.success(r.message, { toasterId: "center" });
       navigate('/auth/verify-email', {
        replace: true
       })
     })
     .catch((e)=>{
       toast.error(e?.data?.message, { toasterId: "topRight" });
     })
  };

  return (
    <div className="max-w-md mx-auto max-h-fit self-center border border-gray-600 shadow-2xs p-6 rounded space-y-2">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Register</h2>
      <FormWrapper schema={registerSchema} onSubmit={handleSubmit}>
        <Input name="email" label="Email" />
        <Input name="password" label="Password" type="password" />
        <Button type="submit">{'Register'}</Button>
      </FormWrapper>

      <div className=" text-gray-800">
        <span>{`Already have an account ?`}</span>
        <span className=" cursor-pointer underline " onClick={() => {
          navigate('/auth/login')
        }}
        >{isLoading ? <Spinner /> : `Sign In`}</span>
      </div>
    </div>
  );
}
