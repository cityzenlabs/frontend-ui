export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
// types.ts

export interface RootState {
  auth: {
    isLoggedIn: boolean;
  };
  // Add types for other slices if needed
}
