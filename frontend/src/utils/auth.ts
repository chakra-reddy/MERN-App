export const setAuthSession = (token: string) => {
  localStorage.setItem("authToken", token);
};

export const getAuthSession = () => {
  return localStorage.getItem("authToken");
};
