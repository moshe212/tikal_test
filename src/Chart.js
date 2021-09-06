import React, { useState, useEffect } from "react";
import { Ring } from "react-awesome-spinners";
import axios from "axios";
import "./Chart.css";

const Chart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const arrChart = [];
  let i = 1;
  const worldList = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];
  let url = `https://swapi.dev/api/planets/${i}/`;
  const getPlanet = async (url) => {
    let next = true;
    while (next) {
      try {
        url = `https://swapi.dev/api/planets/${i}/`;
        const res = await axios.get(url);
        const worldname = res.data.name;
        const population = res.data.population;

        if (worldList.includes(worldname)) {
          arrChart.push({ name: worldname, population: population });
        }
        i++;
      } catch (e) {
        next = false;
      }
    }
    setData(arrChart);
    setLoading(false);
  };

  useEffect(() => {
    getPlanet(url);
  }, []);

  if (data.length > 0) {
    return (
      <div className="Chart">
        <section className="bar-graph bar-graph-vertical bar-graph-two">
          <h2>Chart</h2>

          <div className="bar-one bar-container">
            <div className="bar" data-populate={data[0].population}></div>
            <span className="planet">Tatooine</span>
          </div>
          <div className="bar-two bar-container">
            <div className="bar" data-populate={data[1].population}></div>
            <span className="planet">Alderaan</span>
          </div>
          <div className="bar-three bar-container">
            <div className="bar" data-populate={data[2].population}></div>
            <span className="planet">Naboo</span>
          </div>
          <div className="bar-four bar-container">
            <div className="bar" data-populate={data[3].population}></div>
            <span className="planet">Bespin</span>
          </div>
          <div className="bar-five bar-container">
            <div className="bar" data-populate={data[4].population}></div>
            <span className="planet">Endor</span>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div className="loading">
        <h2>Chart Loading...</h2>
        <Ring />
      </div>
    );
  }
};

export default Chart;
