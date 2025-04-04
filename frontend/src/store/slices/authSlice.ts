import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of the authentication state
interface AuthState {
  token: string | null;        // The JWT token from the backend or Firebase
  role: string | null;         // The role of the user (could be 'customer', 'admin', etc.)
  isAuthenticated: boolean;    // A flag to check if the user is logged in or not
}

// Define the initial state of the authentication
const initialState: AuthState = {
  token: null,                 // Initially, the token is null
  role: null,                  // Initially, the role is null
  isAuthenticated: false,      // Initially, the user is not authenticated
};

// Create a slice for the auth state
const authSlice = createSlice({
  name: 'auth',               // The name of the slice
  initialState,               // The initial state of the slice
  reducers: {
    // Action to set the credentials (after login)
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; role: string }>
    ) => {
      state.token = action.payload.token;  // Set the token from the action payload
      state.role = action.payload.role;    // Set the role from the action payload
      state.isAuthenticated = true;         // Set isAuthenticated to true (user is logged in)
    },
    // Action to log out the user
    logout: (state) => {
      state.token = null;          // Reset the token to null
      state.role = null;           // Reset the role to null
      state.isAuthenticated = false; // Set isAuthenticated to false (user is logged out)
    },
  },
});

// Export the actions from the slice
export const { setCredentials, logout } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;

// Selectors to access the auth state in components
// Selector to get the current token
export const selectToken = (state: { auth: AuthState }) => state.auth.token;

// Selector to get the current role
export const selectRole = (state: { auth: AuthState }) => state.auth.role;

// Selector to check if the user is authenticated
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
