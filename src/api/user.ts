import { authInstance } from "@/api/axios";

export const deleteUser = async () => {
  const response = await authInstance.delete("/api/users");
  return response.data;
};
