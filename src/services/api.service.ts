import { IBook } from "@/interfaces";
import axios from "axios";

const signup = async (email: string, name: string, password: string) => {
  const res = await axios.post("/api/user/signup", {
    email,
    name,
    password,
  });
  return res;
};

const login = async (email: string, password: string) => {
  const res = await axios.post("/api/user/login", {
    email,
    password,
  });
  return res;
};

const getBooks = async (query: string, maxResult: number) => {
  const res = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResult}`
  );
  return res;
};

const getReadingList = async () => {
  const res = await axios.get("/api/book");
  return res;
};

const addBookToReadingList = async (book: IBook, userId: string) => {
  const res = await axios.post(`/api/book/?userId=${userId}`, book);
  return res;
};

const removeBookFromReadingList = async (bookId: string, userId: string) => {
  const res = await axios.delete(
    `/api/book/?bookId=${bookId}&userId=${userId}`
  );
  return res;
};

export default {
  signup,
  login,
  getBooks,
  getReadingList,
  addBookToReadingList,
  removeBookFromReadingList,
};
