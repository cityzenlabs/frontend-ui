// userService.js

export const fetchUserData = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:8080/users/${userId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchProfilePicture = async (userId: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/users/${userId}/profile-picture`,
    );
    const imageUrl = await response.text();
    return imageUrl;
  } catch (error) {
    throw error;
  }
};

export const updateProfilePicture = async (userId: string, file: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/users/${userId}/upload-profile-picture`,
      { method: "POST", body: file },
    );
    const imageUrl = await response.text();
    return imageUrl;
  } catch (error) {
    throw error;
  }
};

// userService.js

export const updateEmail = async (userId: string, email: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/users/${userId}/update-auth`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authType: "EMAIL",
          authIdentifier: email,
        }),
      },
    );
    if (response.ok) {
      return "success";
    }
  } catch (error) {
    throw error;
  }
};

// userService.js

export const updatePhoneNumber = async (
  userId: string,
  phoneNumber: string,
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/users/${userId}/update-auth`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authType: "PHONE_NUMBER",
          authIdentifier: phoneNumber,
        }),
      },
    );
    if (response.ok) {
      return "success";
    }
  } catch (error) {
    throw error;
  }
};

// userService.js

export const updateProfileInfo = async (userId: string, data: any) => {
  try {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
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
