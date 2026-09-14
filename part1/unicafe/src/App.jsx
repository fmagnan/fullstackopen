import { useState } from "react";

const Button = ({ text, counter, setCounter }) => {
  const increment = () => setCounter(counter + 1);

  return (
    <>
      <button onClick={() => increment()}>{text}</button>
    </>
  );
};

const Feedbacks = ({ good, setGood, neutral, setNeutral, bad, setBad }) => {
  return (
    <div>
      <h2>give feedbacks</h2>
      <Button text="good" counter={good} setCounter={setGood} />
      <Button text="neutral" counter={neutral} setCounter={setNeutral} />
      <Button text="bad" counter={bad} setCounter={setBad} />
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text} </td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = () => good + neutral + bad;

  const average = () => (good - bad) / all();

  const positive = () => (good * 100) / all();

  if (all() == 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all()} />
            <StatisticLine text="average" value={average()} />
            <StatisticLine text="positive" value={positive()} />
          </tbody>
        </table>
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Unicafe</h1>
      <Feedbacks
        good={good}
        setGood={setGood}
        neutral={neutral}
        setNeutral={setNeutral}
        bad={bad}
        setBad={setBad}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
