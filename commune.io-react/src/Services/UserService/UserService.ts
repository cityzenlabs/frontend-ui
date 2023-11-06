export const fetchUserData = async () => {
  try {
    const response = await fetch(`http://localhost:8080/users/profile`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NTQ4M2Y0NzZjMWYwODQ3OTJjODg0YTgiLCJzdWIiOiJ0ZXN0dXNlcjExQGdtYWlsLmNvbSIsImlhdCI6MTY5OTIzMzYyMywiZXhwIjoxNjk5MzIwMDIzfQ.KM8ffVXx0taWZP6GkGtBD9SpP15yI4fCIvo7_XXtssk",
      },
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
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NTQ4M2Y0NzZjMWYwODQ3OTJjODg0YTgiLCJzdWIiOiJ0ZXN0dXNlcjExQGdtYWlsLmNvbSIsImlhdCI6MTY5OTIzMzYyMywiZXhwIjoxNjk5MzIwMDIzfQ.KM8ffVXx0taWZP6GkGtBD9SpP15yI4fCIvo7_XXtssk",
        },
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
      {
        method: "POST",
        body: file,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NTQ4M2Y0NzZjMWYwODQ3OTJjODg0YTgiLCJzdWIiOiJ0ZXN0dXNlcjExQGdtYWlsLmNvbSIsImlhdCI6MTY5OTIzMzYyMywiZXhwIjoxNjk5MzIwMDIzfQ.KM8ffVXx0taWZP6GkGtBD9SpP15yI4fCIvo7_XXtssk",
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

export const updateEmail = async (email: string) => {
  try {
    const response = await fetch(`http://localhost:8080/users/update-auth`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NTQ4M2Y0NzZjMWYwODQ3OTJjODg0YTgiLCJzdWIiOiJ0ZXN0dXNlcjExQGdtYWlsLmNvbSIsImlhdCI6MTY5OTIzMzYyMywiZXhwIjoxNjk5MzIwMDIzfQ.KM8ffVXx0taWZP6GkGtBD9SpP15yI4fCIvo7_XXtssk",
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NTQ4M2Y0NzZjMWYwODQ3OTJjODg0YTgiLCJzdWIiOiJ0ZXN0dXNlcjExQGdtYWlsLmNvbSIsImlhdCI6MTY5OTIzMzYyMywiZXhwIjoxNjk5MzIwMDIzfQ.KM8ffVXx0taWZP6GkGtBD9SpP15yI4fCIvo7_XXtssk",
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NTQ4M2Y0NzZjMWYwODQ3OTJjODg0YTgiLCJzdWIiOiJ0ZXN0dXNlcjExQGdtYWlsLmNvbSIsImlhdCI6MTY5OTIzMzYyMywiZXhwIjoxNjk5MzIwMDIzfQ.KM8ffVXx0taWZP6GkGtBD9SpP15yI4fCIvo7_XXtssk",
      },
      body: JSON.stringify(data),
    });
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw error;
  }
};
