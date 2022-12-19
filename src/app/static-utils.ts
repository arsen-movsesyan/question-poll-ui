import {JwtHelperService} from "@auth0/angular-jwt";

// Function expressions are not supported in decorators
export function fetchAuthTokenFromLocalStorage() {
  return localStorage.getItem('__qp_auth_token');
}

export const saveAuthTokenToLocalStorage = (token: string) => {
  return localStorage.setItem('__qp_auth_token', token);
};

export const saveUserToLocalStorage = (userName: string) => {
  localStorage.setItem('__qp_username', userName);
};

export const fetchUserFromLocalStorage = () => {
  return localStorage.getItem('__qp_username');
};

export const isAuthenticated = () => {
  const authToken = fetchAuthTokenFromLocalStorage();
  const isExpired = new JwtHelperService().isTokenExpired(authToken ? authToken : undefined);
  return !isExpired;
};

export const deleteAuthTokenFromLocalStorage = () => {
  localStorage.removeItem('__qp_auth_token');
};

export const deleteUserFromLocalStorage = () => {
  localStorage.removeItem('__qp_username');
};
