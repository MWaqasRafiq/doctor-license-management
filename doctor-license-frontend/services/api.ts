import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7025/api",
  headers: { "Content-Type": "application/json" }
});

export const getDoctors = (search?: string, status?: number) =>
  API.get("/doctors", { params: { search, status } });

export const createDoctor = (data: any) => API.post("/doctors", data);

export const updateDoctor = (data: any) => API.put("/doctors", data);

export const deleteDoctor = (id: string) => API.delete(`/doctors/${id}`);