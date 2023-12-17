export const getNotifications = async (token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/notifications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const readNotification = async (token: any, id: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/notifications/${id}/read`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
};
