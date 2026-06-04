import axiosInstance from "./axiosInstance";

export const getTicketsApi = (params) =>
  axiosInstance.get("/tickets", { params });

export const getTicketByIdApi = (id) => axiosInstance.get(`/tickets/${id}`);

export const createTicketApi = (data) => axiosInstance.post("/tickets", data);

export const updateTicketApi = (id, data) =>
  axiosInstance.put(`/tickets/${id}`, data);

export const deleteTicketApi = (id) => axiosInstance.delete(`/tickets/${id}`);

export const updateTicketStatusApi = (id, status) =>
  axiosInstance.patch(`/tickets/${id}/status`, { status });

export const assignTicketApi = (id, agentId) =>
  axiosInstance.patch(`/tickets/${id}/assign`, { agentId });

export const addCommentApi = (id, message) =>
  axiosInstance.post(`/tickets/${id}/comments`, { message });
