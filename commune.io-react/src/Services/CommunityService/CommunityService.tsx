export const createCommunity = async (community: any, token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/community`, {
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
      `http://localhost:8080/community/${communityId}/dashboard`,
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

export const getCommunityDiscovery = async (token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/community/discovery`, {
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

export const getCommunityEvents = async (id: any, token: any, status: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/community/${id}/events/${status}`,
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
      `http://localhost:8080/community/${id}/members`,
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

export const getCommunityPage = async (id: any, token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/community/${id}/page`, {
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

export const getCommunityHome = async (token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/community/home`, {
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
      `http://localhost:8080/community/${id}/photo`,
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
    const response = await fetch(`http://localhost:8080/user/${id}/joined`, {
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

export const leaveCommunity = async (token: any, id: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/community/${id}/members`,
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

export const joinCommunity = async (token: any, id: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/community/${id}/members`,
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

export const editCommunity = async (token: any, id: any, community: any) => {
  try {
    const response = await fetch(`http://localhost:8080/community/${id}`, {
      method: "PUT",
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

export const getCommunityPhotoGallery = async (token: any, id: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/community/${id}/gallery`,
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
