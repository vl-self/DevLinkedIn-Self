export const loginApi = async (formData) => {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    const errRes = await response.json();
    throw new Error(errRes?.error);
  }
  const res = await response.json();
  return res;
};
