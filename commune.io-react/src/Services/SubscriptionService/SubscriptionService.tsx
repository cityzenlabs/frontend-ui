export const updateUserSubscription = async (token: any, tier: any) => {
  try {
    const response = await fetch(`http://localhost:8080/user/subscription`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tier: tier }),
    });
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const updatePaymentMethod = async (token: any, paymentMethodId: any) => {
  try {
    const response = await fetch(`http://localhost:8080/user/billing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paymentMethodId: paymentMethodId }),
    });
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
};
