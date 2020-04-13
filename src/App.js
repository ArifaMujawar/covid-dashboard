import React, { useState, useEffect } from "react";
import "./App.css";
import NumberCard from "./NumberCard";
import Graph from "./Graph";
import axios from "axios";

function App() {
  const [todayData, setTodayData] = useState({});
  const country = 'India';
  const getData = async () => {
    const result = await axios(
      `https://api.covid19api.com/live/country/${country}/status/confirmed`
    );
    setTodayData(result.data[0])
       
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Covid-19</h1>
      </header>
      <h4>{country}</h4>
      <div className="cardCases">
        <NumberCard totalCases={todayData.Confirmed} label="Total Cases" />
        <NumberCard totalCases={todayData.Deaths} label="Deaths" />
        <NumberCard totalCases={todayData.Recovered} label="Recovered" />
      </div>
      <hr></hr>
      <div className="cardCases">
        <div>
          <h4>Total Cases</h4>
          <Graph />
        </div>
        <div>
          <h4>Total Cases</h4>
          <Graph />
        </div>
        <div>
          <h4>Total Cases</h4>
          <Graph />
        </div>
      </div>
    </div>
  );
}

export default App;
