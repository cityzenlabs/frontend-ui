export const fetchUserProfile = async (token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/users/profile`, {
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

export const fetchUserDashboard = async (token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/users/dashboard`, {
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

export const fetchProfilePicture = async (token: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/users/profile-picture`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const imageUrl = await response.text();
    return imageUrl;
  } catch (error) {
    throw error;
  }
};

export const updateProfilePicture = async (file: string, token: any) => {
  try {
    const response = await fetch(
      `http://localhost:8080/users/profile-picture`,
      {
        method: "POST",
        body: file,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const imageUrl = await response.text();
    return imageUrl;
  } catch (error) {
    throw error;
  }
};

// userService.js

export const updateEmail = async (email: string, token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/users/update-auth`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        authType: "EMAIL",
        authIdentifier: email,
      }),
    });
    if (response.ok) {
      return "success";
    }
  } catch (error) {
    throw error;
  }
};

// userService.js

export const updatePhoneNumber = async (phoneNumber: string, token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/users/update-auth`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        authType: "PHONE_NUMBER",
        authIdentifier: phoneNumber,
      }),
    });
    if (response.ok) {
      return "success";
    }
  } catch (error) {
    throw error;
  }
};

// userService.js

export const updateProfileInfo = async (data: any, token: any) => {
  try {
    const response = await fetch(`http://localhost:8080/users`, {
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
