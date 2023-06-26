import axios from "axios";
import FormData from "form-data"

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization", 
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
  }
});

export const getAllPet = async () => {
  return await http.get("/pets");
}

export const getPet = async (id) => {
  return await http.get(`/pets/${id}`);
}

export const createPet = async (data) => {
  let formData = new FormData();
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('petName', data.petName)
  formData.append('breed', data.breed)
  formData.append('email', data.email)
  formData.append("image", data.image);
  return await http.post("/pet", formData, {
    'Content-Type': 'multipart/form-data'
  });
}

export const updatePet = async (id, data) => {
  return await http.put(`/pets`, data);
}

export const deletePet = async (id) => {
  return await http.delete(`/pet/${id}`);
}