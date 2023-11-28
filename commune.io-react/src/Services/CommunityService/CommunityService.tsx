export const createCommunity = async (community: any, token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/communities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(community),
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

export const getCommunityDashboard = async (communityId: any, token: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/communities/${communityId}/dashboard`,
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

export const getCommunityHome = async (token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/communities/home`, {
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

export const getCommunityPicture = async (id: any, token: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/communities/${id}/community-picture`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      return response.text();
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const getCommunityEvents = async (id: any, token: any, status: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/communities/${id}/events/${status}`,
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

export const getCommunityMembers = async (id: any, token: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/communities/${id}/members`,
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

export const getCommunity = async (id: any, token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/communities/${id}`, {
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

export const getCommunityPortal = async (token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/communities/portal`, {
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

export const updateCommunityPicture = async (
  token: any,
  id: string,
  image: File,
) => {
  const formData = new FormData();
  formData.append("file", image); // Assuming 'image' is the key expected by your backend

  try {
    const response = await fetch(
      `http://localhost:8080/communities/${id}/community-picture`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Send formData as body
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

export const getJoinedCommunities = async (token: any, id: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/communities/${id}/joined`,
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
