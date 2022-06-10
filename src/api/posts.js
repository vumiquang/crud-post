import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

function fetchAllPost() {
  return api.get("/posts");
}

function addPost(data) {
  return api.post("/posts", data);
}

function updatePost(data) {
  const url = "/posts/" + data.id;
  return api.put(url, data);
}

function deletePost(id) {
  const url = "/posts/" + id;
  return api.delete(url);
}
export { fetchAllPost, addPost, updatePost, deletePost };
