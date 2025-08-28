import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/** --------------------
 * Types matching Joi schema
 * -------------------- */
export interface PaymentCustomer {
  name: string;
  email: string;
  contact: string;
}

export interface PlaceOrderRequest {
  amount: number;            // positive required
  currency?: string;         // defaults to INR if not sent
  appId: string;             // required
  userId: string;            // required
  orderId?: string;          // optional
  customer: PaymentCustomer; // required
  notes?: Record<string, any>; // optional
}

interface paymenyData {
  id: string;
  status: string;
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  currency: string;
  razorpayKey: string;
  notes: {
    appId: string;
    userId: string;
    [key: string]: any; // in case backend returns extra fields
  };

  offer_id?: string | null;
  receipt: string;

  entity: string;
  created_at: number;

  [key: string]: any; // in case backend returns extra fields
}

export interface PlaceOrderResponse {
  order: paymenyData;
}

/** --------------------
 * API Slice
 * -------------------- */
export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_PAYMENT_URL }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<PlaceOrderResponse, PlaceOrderRequest>({
      query: (body) => ({
        url: "/payments/create-order",
        method: "POST",
        body,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log('data',data)
          console.log('arg',arg)

          const options = {
            key: data.order.razorpayKey, // test key from backend
            amount: data.order.amount,
            currency: data.order.currency,
            name: data.order.notes.appId,
            description: "Test Transaction",
            order_id: data.order.id,       
            userId: data.order.notes.userId,
            handler: function (response: any) {
              alert("Payment Successful 🎉");
              console.log("Payment Success Response:", response);
            },
            prefill: {
              name: arg.customer.name,
              email: arg.customer.email,
              contact: arg.customer.contact,
            },
            theme: {
              color: "#3399cc",
            },
          };
          console.log('options',options);
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        } catch (err) {
          console.error("Payment order creation failed", err);
        }
      },
    }),
  }),
});

export const { useCreateOrderMutation } = paymentApi;