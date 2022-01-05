export const config = {
    withCredentials: true,
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`,
    },
  };
