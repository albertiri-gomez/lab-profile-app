import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/auth",
  withCredentials: true
});

export const doSignup = async ({ username, password, campus, course }) => {
  const res = await api.post("/signup", {
    username,
    password,
    campus,
    course
  });
  console.log("Respuesta del server", res.data);
  console.log("Usuario Creado");

  return res.data;
};

export const doLogin = async ({ username, password }) => {
  console.log("Login usuario...", username, password);
  const res = await api.post("/login", {
    username,
    password
  });
  console.log("Respuesta del server", res);
  console.log("Respuesta del server", res.data);
  return res.data;
};

export const doLogout = async () => {
  console.log("loggin out!");
  const res = await api.post("/logout");
  console.log(" logout", res);
};

export const whoUser = async () => {
  console.log("whoUser");
  const res = await api.post("/whoami");
  console.log("whami", res.data);
  return res.data;
};

export const doEdit = async ({ username, campus, course }) => {
  console.log("edit!");
  const res = await api.post("/edit", {
    username,
    campus,
    course
  });
  console.log(" edit", res);
};
