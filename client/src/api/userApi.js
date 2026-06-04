import axiosInstance from "./axiosInstance";

export const getUsersApi = () => axiosInstance.get("/users");
export const getAgentsApi = () => axiosInstance.get("/users/agents");
export const toggleUserStatusApi = (id, isActive) =>
  axiosInstance.patch(`/users/${id}/status`, { isActive });
