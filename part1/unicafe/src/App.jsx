import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticsLine = ({ text, metric }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {metric.toFixed(1)} {text === "positive" ? "%" : ""}
      </td>
    </tr>
  );
};

const Statisctics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  const average = (good + bad * -1) / (good + bad + neutral);
  const positive = (good / (good + bad + neutral)) * 100;

  return (
    <>
      <h1>statistics</h1>
      {good > 0 || bad > 0 || neutral > 0 ? (
        <table>
          <tbody>
            <StatisticsLine text="good" metric={good} />
            <StatisticsLine text="neutral" metric={neutral} />
            <StatisticsLine text="bad" metric={bad} />
            <StatisticsLine text="all" metric={all} />
            <StatisticsLine text="average" metric={average} />
            <StatisticsLine text="positive" metric={positive} />
          </tbody>
        </table>
      ) : (
        "No feedback given"
      )}
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleIncreaseGood = () => {
    setGood((g) => g + 1);
  };
  const handleIncreaseNeutral = () => {
    setNeutral((n) => n + 1);
  };
  const handleIncreaseBad = () => {
    setBad((b) => b + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button text="good" onClick={handleIncreaseGood} />
        <Button text="neutral" onClick={handleIncreaseNeutral} />
        <Button text="bad" onClick={handleIncreaseBad} />
      </div>
      <Statisctics good={good} bad={bad} neutral={neutral} />
    </>
  );
}

export default App;
