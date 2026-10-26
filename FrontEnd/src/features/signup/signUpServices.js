export const signUpAPI = async (signupData) => {
  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  });

  if (!response.ok) {
    const errRes = await response.json();
    throw new Error(errRes?.error);
  }
  const res = await response.json();
  return res;
};
