import React, { useEffect, useState } from "react";
import { Ring } from "react-awesome-spinners";
import axios from "axios";
import "./Table.css";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPilot = async (pilot) => {
    const res_P = await axios(pilot);
    const res_p_full = [res_P.data.name, res_P.data.homeworld];
    return res_p_full;
  };

  const getPopulate = async (homeworld) => {
    const res_H = await axios(homeworld);
    const res_h_full = [res_H.data.name, res_H.data.population];
    return res_h_full;
  };

  let url = "https://swapi.dev/api/vehicles/?page=1";
  const populat_per_vehicle = [];
  const getV = async (url) => {
    let next = true;
    while (next) {
      const res = await axios.get(url);
      url = res.data.next;
      if (url == null) {
        next = false;
      }
      const vehicles = res.data.results;
      for (let i = 0; i < vehicles.length; i++) {
        const vehicleName = vehicles[i].name;
        const pilots = vehicles[i].pilots;
        const pilots_names = [];
        const worldnamePopulation = [];
        if (pilots.length > 0) {
          for (let p = 0; p < pilots.length; p++) {
            const resPilot = await getPilot(pilots[p]);
            const pilotname = resPilot[0];
            const homeworld = resPilot[1];
            pilots_names.push(pilotname);

            const resPopulation = await getPopulate(homeworld);
            const worldName = resPopulation[0];
            const worldPopulation =
              resPopulation[1] !== "unknown" ? resPopulation[1] : 0;
            worldnamePopulation.push({
              name: worldName,
              population: worldPopulation,
            });
          }
          const sum_Populat = worldnamePopulation.reduce(
            (a, b) => parseInt(a) + parseInt(b.population),
            0
          );
          populat_per_vehicle.push({
            vehicleName,
            pilots_names,
            worldnamePopulation,
            total: sum_Populat,
          });
          console.log(populat_per_vehicle);
        }
      }
    }
    setData(populat_per_vehicle);
    setLoading(false);
  };

  useEffect(() => {
    getV(url);
  }, []);

  let maxObj = data.reduce(
    (max, obj) => (max.total > obj.total ? max : obj),
    0
  );

  if (maxObj) {
    return (
      <div className="table">
        <h2>Table</h2>

        <table>
          <tbody>
            <tr>
              <td>Vehicle name with the largest sum</td>
              <td>{maxObj.vehicleName}</td>
            </tr>
            <tr>
              <td>Related home planets and their respective population</td>
              <td>
                {maxObj.worldnamePopulation.map(
                  (obj) => obj.name + " : " + obj.population + " "
                )}
              </td>
            </tr>
            <tr>
              <td>Related pilot names</td>
              <td>
                {maxObj.pilots_names.map((x) =>
                  maxObj.pilots_names.length > 1 ? x + " , " : x
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="loading">
        <h2>Table Loading...</h2>
        <Ring />
      </div>
    );
  }
};

export default Table;
