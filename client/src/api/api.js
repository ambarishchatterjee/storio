import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const getImage = (imageUrl) => {
    return `http://localhost:8001/${imageUrl}`
}

export const userLogin = async (userData) => {
  console.log("Sending:", userData);
    
  const response = await fetch("http://localhost:8001/api/login", {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json", // ✅ This is required
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    console.log("Response not OK:", response);
    throw new Error("Failed to Login");
  }

  const data = await response.json();
  console.log("Received:", data);

  return data;
};
