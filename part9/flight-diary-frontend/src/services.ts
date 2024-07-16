import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getDiaries = async () => {
  const res = await axios.get<DiaryEntry[]>(baseUrl);
  return res.data;
};

export const createDiary = async (object: NewDiaryEntry) => {
  const res = await axios.post<DiaryEntry>(baseUrl, object);
  return res.data;
};
