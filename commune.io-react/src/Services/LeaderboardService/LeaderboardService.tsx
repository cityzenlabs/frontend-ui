export const getLeaderboard = async (token: any, route: any) => {
  try {
    const response = await fetch(`http://localhost:8080/leaderboard?${route}`, {
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
