import axios from "axios";
import { useEffect, useState } from "react";
import { createDiary, getDiaries } from "./services";
import { DiaryEntry, Visibility, Weather } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getDiaries().then((data) => data && setDiaries(data));
  }, []);

  const addDiary = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!date || !weather || !visibility || !comment) return;
    try {
      const newDiary = {
        date,
        weather,
        visibility,
        comment,
      };
      const data = await createDiary(newDiary);
      if (data) setDiaries(diaries.concat(data));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data;
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    setDate("");
    setWeather(null);
    setVisibility(null);
    setComment("");
  };

  return (
    <div>
      <>{error && <h2 style={{ color: "red" }}>{error}</h2>}</>
      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          date:{" "}
          <input
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          weather: sunny
          <input
            type="radio"
            name="weather"
            value="sunny"
            onChange={(e) => setWeather(e.target.value as Weather)}
          />
          rainy
          <input
            type="radio"
            name="weather"
            value="rainy"
            onChange={(e) => setWeather(e.target.value as Weather)}
          />
          cloudy
          <input
            type="radio"
            name="weather"
            value="cloudy"
            onChange={(e) => setWeather(e.target.value as Weather)}
          />
          windy
          <input
            type="radio"
            name="weather"
            value="windy"
            onChange={(e) => setWeather(e.target.value as Weather)}
          />
          stormy
          <input
            type="radio"
            name="weather"
            value="stormy"
            onChange={(e) => setWeather(e.target.value as Weather)}
          />
        </div>
        <div>
          visibility: great
          <input
            type="radio"
            name="visibility"
            value="great"
            onChange={(e) => setVisibility(e.target.value as Visibility)}
          />
          good
          <input
            type="radio"
            name="visibility"
            value="good"
            onChange={(e) => setVisibility(e.target.value as Visibility)}
          />
          ok
          <input
            type="radio"
            name="visibility"
            value="ok"
            onChange={(e) => setVisibility(e.target.value as Visibility)}
          />
          poor
          <input
            type="radio"
            name="visibility"
            value="poor"
            onChange={(e) => setVisibility(e.target.value as Visibility)}
          />
        </div>
        <div>
          comment:{" "}
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">add diary</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map((d) => (
        <div key={d.id}>
          <h4>{d.date}</h4>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather} </p>
          <p></p>
        </div>
      ))}
    </div>
  );
};

export default App;
