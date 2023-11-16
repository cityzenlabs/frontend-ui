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
