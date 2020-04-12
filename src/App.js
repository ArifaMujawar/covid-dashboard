import React from "react";
import "./App.css";
import Chart from "./chart";
import NumberCard from "./NumberCard";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Covid-19</h1>
      </header>
      <h4>Country name</h4>
      <div className="cardCases">
        <NumberCard totalCases={13} label="Total Cases" />
        <NumberCard totalCases={3} label="Death" />
        <NumberCard totalCases={30} label="Recovered" />
      </div>
      <hr></hr>
    </div>
  );
}

export default App;
