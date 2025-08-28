import { useEffect } from "react";
import { useCreateOrderMutation } from "../store/services/paymentApis";


export default function TestPaymentPage() {
    const [trigger, { isLoading }] = useCreateOrderMutation()
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
      trigger({
          amount: 1000,            // positive required
        //   currency?: string;         // defaults to INR if not sent
          appId: 'my-shoping-app',           // required
          userId: 'abcd1234',
          notes: {
            userId: 'abcd1234',
          },
        //   orderId?: string;          // optional
          customer: {
              name: 'Test user one',
              email: 'testuserone@mail.com',
              contact: '+91 7978961978'
          }
      })
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Test Razorpay Payment</h1>
      <button
        onClick={handlePayment}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        {isLoading?'loading':'Trigger Payment'}
      </button>
    </div>
  );
}
