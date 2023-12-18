export const fetchUserProfile = async (token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchUserHome = async (token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/user/home`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async (token: any, id: any) => {
  try {
    const response = await fetch(`http://localhost:8080/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateProfilePicture = async (file: string, token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/user/photo`, {
      method: "PUT",
      body: file,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const imageUrl = await response.text();
    return imageUrl;
  } catch (error) {
    throw error;
  }
};

export const updateProfileInfo = async (data: any, token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw error;
  }
};
