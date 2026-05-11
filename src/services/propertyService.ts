import apiClient from "@/config/axios";

export const deleteProperty = async (id: string | number) => {
  const res = await apiClient.delete(`/properties/${id}`);
  return res.data;
};

export const getPropertyById = async (id: string | number) => {
  const res = await apiClient.get(`/properties/${id}`);
  return res.data;
};