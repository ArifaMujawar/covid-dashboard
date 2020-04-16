/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./App.css";
import NumberCard from "./NumberCard";
import Graph from "./Graph";
import Country from "./Country";

import axios from "axios";
import moment from "moment";
import ReactGA from 'react-ga';

const trackingId = "UA-163831151-1"; 
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);


function App() {
  const [todayData, setTodayData] = useState({});
  const [graphData, setGraphData] = useState({});
  const [country, setCountry] = useState("India");

  const getData = async () => {
    const result = await axios(`https://api.covid19api.com/country/${country}`);
    setTodayData(result.data[result.data.length - 1]);
    let weekData = result.data.slice(result.data.length - 30);
    weekData = weekData.map((item) => {
      item.Date = moment(item.Date).format("MMM Do");
      return item;
    });
    setGraphData(weekData);
  };
  function updateCountry(updatedCountry) {
    setCountry(updatedCountry);
  }

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [country]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>COVID-19 Dashboard</h1>
      </header>
      <Country handler={updateCountry} />
      <div className="container">
        <div className="cardCases">
          <NumberCard totalCases={todayData.Confirmed} label="Total Cases" />
          <NumberCard totalCases={todayData.Deaths} label="Deaths" />
          <NumberCard totalCases={todayData.Recovered} label="Recovered" />
        </div>
        <hr></hr>
        <div className="cardCases">
          <div>
            <h4>Total Cases</h4>
            <Graph
              weekData={graphData}
              XAxisDatakey={"Date"}
              AreaDataKey={"Confirmed"}
              fill={"#8884d8"}
            />
          </div>
          <div>
            <h4>Deaths</h4>
            <Graph
              weekData={graphData}
              XAxisDatakey={"Date"}
              AreaDataKey={"Deaths"}
              fill={"#df2808"}
            />
          </div>
          <div>
            <h4>Recovered</h4>
            <Graph
              weekData={graphData}
              XAxisDatakey={"Date"}
              AreaDataKey={"Recovered"}
              fill={"#26e760"}
            />
          </div>
        </div>
        <hr></hr>
      </div>
    <div>
    
    
    </div>
      <footer>
        © 2020 <a href="https://arifa-mujawar.netlify.com"> Arifa Mujawar </a>
      </footer>
    </div>
  );
}

export default App;
