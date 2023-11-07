export const createCommunity = async (community: any) => {
  try {
    const response = await fetch(`http://localhost:8080/communities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Make sure this is set for JSON payload
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NTQ4M2Y0NzZjMWYwODQ3OTJjODg0YTgiLCJzdWIiOiJ0ZXN0dXNlcjExQGdtYWlsLmNvbSIsImlhdCI6MTY5OTMyMTUzMywiZXhwIjoxNjk5NDA3OTMzfQ.0I-Ygrrye36WKT1RBHX7RQo6vRI5sboVGP04a5t3Ws8", // Make sure you're using the actual token
      },
      body: JSON.stringify(community), // Stringify the JSON object
    });
    if (response.ok) {
      return response.json(); // If successful, parse and return the JSON body
    } else {
      return response; // If not successful, return the response to handle the error
    }
  } catch (error) {
    throw error; // or handle the error as you wish
  }
};
