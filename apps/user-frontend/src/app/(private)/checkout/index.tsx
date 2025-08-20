import FormWrapper from "@shared/components/FormWrapper";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";
import * as yup from "yup";

const checkoutSchema = yup.object({
  address: yup.string().required(),
  card: yup.string().required().min(16).max(16),
});

export default function Checkout() {
  const handleSubmit = (data: any) => {
    console.log("Checkout", data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded">
      <h2 className="text-lg font-bold mb-4">Checkout</h2>
      <FormWrapper schema={checkoutSchema} onSubmit={handleSubmit}>
        <Input name="address" label="Shipping Address" />
        <Input name="card" label="Card Number" />
        <Button type="submit">Place Order</Button>
      </FormWrapper>
    </div>
  );
}
