// userService.js

export const fetchUserData = async () => {
  try {
    const response = await fetch(`http://localhost:8080/users/profile`, {
      credentials: "include",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchProfilePicture = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/users/profile-picture`,
      {
        credentials: "include",
      },
    );
    const imageUrl = await response.text();
    return imageUrl;
  } catch (error) {
    throw error;
  }
};

export const updateProfilePicture = async (file: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/users/profile-picture`,
      { method: "POST", body: file },
    );
    const imageUrl = await response.text();
    return imageUrl;
  } catch (error) {
    throw error;
  }
};

// userService.js

export const updateEmail = async (email: string) => {
  try {
    const response = await fetch(`http://localhost:8080/users/update-auth`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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

export const updatePhoneNumber = async (phoneNumber: string) => {
  try {
    const response = await fetch(`http://localhost:8080/users/update-auth`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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

export const updateProfileInfo = async (data: any) => {
  try {
    const response = await fetch(`http://localhost:8080/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw error;
  }
};
