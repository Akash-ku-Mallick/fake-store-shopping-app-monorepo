import { useLoginMutation } from "@shared/api/authApi";
import FormWrapper from "@shared/components/FormWrapper";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";
import * as yup from 'yup';
import Spinner from "@shared/components/ui/loader/spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const loginSchema = yup.object({
  email: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});
type formType = yup.InferType<typeof loginSchema>

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate()

  const handleSubmit = (data: formType) => {
     login(data).unwrap()
     .then((r)=>{
       toast.success(r.message, { toasterId: "center" });
     })
     .catch((e)=>{
       toast.error(e?.data?.message, { toasterId: "topRight" });
     })
  };

  return (
    <div className="max-w-md mx-auto max-h-fit self-center border border-gray-600 shadow-2xs p-6 rounded space-x-2">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Login</h2>
      <FormWrapper 
      schema={loginSchema} 
      onSubmit={handleSubmit} 
      defaultValues={{ email: "", password: "" }}>
        <Input name="email" label="email" />
        <Input name="password" label="Password" type="password" />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <div className=" w-full px-3.5"><Spinner size={'sm'} /></div> : "Login"}
        </Button>
      </FormWrapper>

      <div className=" text-gray-800">
        <span>{`Don't have an account ?`}</span>
        <span className=" cursor-pointer underline " onClick={()=>{
          navigate('/auth/register')
        }}
        >{`Create Account`}</span>
      </div>
    </div>
  );
}
