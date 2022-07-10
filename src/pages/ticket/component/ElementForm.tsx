import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
// import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Forms } from "src/pages/ticket/component/Forms";

export const ElementForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  // const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: any) => {
    setIsLoading(true);
    if (!stripe || !elements || !e) {
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    return;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Forms register={register} errors={errors} />

        <PaymentElement id="payment-element" />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="p-4 text-white bg-blue-400 rounded-lg"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="animate-spin" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
      </form>

      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </div>
  );
};
