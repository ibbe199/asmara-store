import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PaymentProps {
  amount: string;
  onSuccess: (details: any) => void;
  title?: string;
}

export default function PayPalPayment({ amount, onSuccess, title = "الدفع عبر PayPal" }: PaymentProps) {
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || "test";

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-sm border" dir="rtl">
      <h3 className="text-center font-bold text-[#1A5F7A] mb-4">{title}</h3>
      <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
        <PayPalButtons
          style={{ layout: "vertical", shape: "pill" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: amount,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            if (actions.order) {
              const details = await actions.order.capture();
              onSuccess(details);
            }
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
