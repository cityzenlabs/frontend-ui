export const getEventDiscovery = async (
  token: any,
  city: any,
  attribute: any,
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/event/discovery?city=${city}&attribute=${attribute}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      return response.json();
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const getEventHome = async (token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/event/home`, {
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

export const getEvent = async (token: any, id: any) => {
  try {
    const response = await fetch(`http://localhost:8080/event/${id}/page`, {
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

export const getEventDashboard = async (token: any, id: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/event/${id}/dashboard`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      return response.json();
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const getEventAttendees = async (token: any, id: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/event/${id}/attendees`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      return response.json();
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const updateEventPicture = async (
  token: any,
  id: string,
  image: File,
) => {
  const formData = new FormData();
  formData.append("file", image); // Assuming 'image' is the key expected by your backend

  try {
    const response = await fetch(`http://localhost:8080/event/${id}/photo`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // Send formData as body
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

export const createEvent = async (event: any, token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
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

export const getRelatedEvents = async (token: any, id: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/event/${id}/related-events`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      return response.json();
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const leaveEvent = async (token: any, id: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/event/${id}/attendees`,
      {
        method: "DELETE",
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

export const joinEvent = async (token: any, id: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/event/${id}/attendees`,
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

export const getEventPicture = async (token: any, id: any) => {
  try {
    const response = await fetch(`http://localhost:8080/event/${id}/photo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return response.text();
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const getEventDiscoveryShowAll = async (token: any, url: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/event/discovery/${url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      return response.json();
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const getEventDiscoverySearch = async (token: any, url: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/event/discovery/${url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      return response.json();
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
};
