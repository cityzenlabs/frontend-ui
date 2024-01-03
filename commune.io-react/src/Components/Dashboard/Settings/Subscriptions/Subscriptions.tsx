import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import * as SubscriptionService from "../../../../Services/SubscriptionService/SubscriptionService";

import { useAuth } from "../../../../Context/AuthContext";
import IInput from "../../../../Library/Input/IInput";
import IDropdown from "../../../../Library/Dropdown/IDropdown";
import IButton from "../../../../Library/Button/IButton";

// Replace with your own Stripe public key
const stripePromise = loadStripe(
  "pk_test_51NlH2kH7sGt1AM1SVH1eBIFfYHmuD8PLv0ij0rVukoLMWDtLr6q1M0HIUIftEQLef5W2i3lmpIWZHqX0rdSGRshx00KdilBI6m",
);

const CheckoutForm = () => {
  const accessToken = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          email: email, // Make sure email is always a string
        },
      });

      if (error) {
      } else {
        try {
          await SubscriptionService.updatePaymentMethod(
            accessToken.token,
            paymentMethod.id,
          );
        } catch (error) {}
        // Send paymentMethod.id to your server to create a subscription
      }
    } else {
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        boxSizing: "border-box",
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #eaeaea",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h3>Your subscription</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span>Premium plan</span>
          <span>$15.00 billed monthly</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <span>Total</span>
          <span>$15.00</span>
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <IInput
          name="email"
          placeholder=""
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#24b47e",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Subscribe
      </button>
    </form>
  );
};

function Subscriptions({ token }: any) {
  const [tier, setTier] = useState("");

  const handleUserSubscription = async () => {
    try {
      await SubscriptionService.updateUserSubscription(token, tier);
    } catch (error) {}
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
      <div style={{ marginBottom: "20px" }}>
        <IDropdown
          labelText=""
          value={tier}
          options={[
            { value: "BASIC", label: "Basic" },
            { value: "PLUS", label: "Plus" },
            { value: "PREMIUM", label: "Premium" },
          ]}
          onChange={(newValue) => setTier(newValue)}
        />
        <IButton text="Tier" onClick={handleUserSubscription} />
      </div>
    </Elements>
  );
}

export default Subscriptions;
