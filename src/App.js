import React, { useState, useEffect } from "react";
import "./App.css";
import NumberCard from "./NumberCard";
import Graph from "./Graph";
import axios from "axios";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function App() {
  const [todayData, setTodayData] = useState({});
  const [graphData, setGraphData] = useState({});
  const country = "Finland";
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
  const classes = useStyles();

  useEffect(() => {
    getData();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Covid-19</h1>
      </header>
      <div className={classes.root}>
      <Button variant="contained" color="primary">
        {country}
      </Button>
      </div>
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
      <footer>Made by me</footer>
    </div>
  );
}

export default App;
