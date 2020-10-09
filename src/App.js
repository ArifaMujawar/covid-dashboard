/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './App.css';
import NumberCard from './components/NumberCard';
import Graph from './components/Graph';
import CountrySelector from './country-list';

import axios from 'axios';
import moment from 'moment';
import ReactGA from 'react-ga';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

const trackingId = 'UA-163831151-1';
ReactGA.initialize(trackingId);

function App() {
  const [todayData, setTodayData] = useState({});
  const [graphData, setGraphData] = useState({});
  const [country, setCountry] = useState('India');

  ReactGA.pageview(window.location.pathname + window.location.search);

  const getData = async () => {
    try {
      const result = await axios(
        `https://api.covid19api.com/total/country/${country}`,
      );

      if (result.data.length === 0) {
        store.addNotification({
          title: 'Message!',
          message: 'This country is not yet supported!',
          type: 'info',
          insert: 'top',
          container: 'top-center',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 1000,
            onScreen: true,
          },
        });
        setCountry('India');
        return;
      }

      const todaysData = result.data[result.data.length - 1];
      todaysData.Active =
        todaysData.Confirmed - (todaysData.Recovered + todaysData.Deaths);

      setTodayData(todaysData);
      let weekData = result.data.slice(result.data.length - 30);

      weekData = weekData.map((item) => {
        item.Date = moment(item.Date).format('MMM Do');
        item.Active = item.Confirmed - (item.Recovered + item.Deaths);
        return item;
      });

      setGraphData(weekData);
    } catch (e) {
      console.log('error ', e);
    }
  };

  function updateCountry(updatedCountry) {
    setCountry(updatedCountry.label);
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

      <CountrySelector onChange={updateCountry} />
      <div className="container">
        <ReactNotification />
        <div className="cardCases">
          <NumberCard count={todayData.Active} label="Active Cases" />
          <NumberCard count={todayData.Deaths} label="Deaths" />
          <NumberCard count={todayData.Recovered} label="Recovered" />
          <NumberCard count={todayData.Confirmed} label="Total Cases" />
        </div>
        <hr></hr>
        <div className="cardCases">
          <div>
            <h4>Active Cases</h4>
            <Graph
              weekData={graphData}
              XAxisDatakey={'Date'}
              AreaDataKey={'Active'}
              fill={'#8884d8'}
            />
          </div>
          <div>
            <h4>Deaths</h4>
            <Graph
              weekData={graphData}
              XAxisDatakey={'Date'}
              AreaDataKey={'Deaths'}
              fill={'#df2808'}
            />
          </div>
          <div>
            <h4>Recovered</h4>
            <Graph
              weekData={graphData}
              XAxisDatakey={'Date'}
              AreaDataKey={'Recovered'}
              fill={'#26e760'}
            />
          </div>
          {/* <div>
            <h4>Total Cases</h4>
            <Graph
              weekData={graphData}
              XAxisDatakey={"Date"}
              AreaDataKey={"Confirmed"}
              fill={"#8884d8"}
            />
          </div> */}
        </div>
        <hr></hr>
      </div>

      <footer>
        <div>
          This website makes of data provided by https://covid19api.com/
        </div>
      </footer>
    </div>
  );
}

export default App;
