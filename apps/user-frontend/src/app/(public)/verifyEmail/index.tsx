import { useVerifyEmailMutation } from '@shared/api/authApi';
import FormWrapper from '@shared/components/FormWrapper';
import * as yup from 'yup';
import Input from '@shared/components/Input'; // assuming you already have a reusable Input
import { useAppSelector } from '../../../hooks/reduxHelper';
import { currentUser } from '../../../store/slices/authSlice';

// ✅ Yup schema
const formSchema = yup.object({
  otp: yup
    .string()
    .required('OTP is required')
    .length(6, 'OTP must be 6 digits'),
});

type FormType = yup.InferType<typeof formSchema>;

const VerifyEmail = () => {
  const [verifyOtp, { isLoading }] = useVerifyEmailMutation();
  const userInfo = useAppSelector(currentUser);

  const onSubmit = async (data: FormType) => {
    if (userInfo) {
      await verifyOtp({
        otp: data.otp,
        userId: userInfo._id,
      });
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <FormWrapper<FormType> schema={formSchema} onSubmit={onSubmit}>
        <Input name="otp" label="Enter OTP" placeholder="123456" maxLength={6} />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 mt-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </button>
      </FormWrapper>
    </div>
  );
};

export default VerifyEmail;
