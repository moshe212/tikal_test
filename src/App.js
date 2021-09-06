import React from "react";
import "./App.css";
import Table from "../src/components/table/Table";
import Chart from "../src/components/chart/Chart";

const App = () => {
  return (
    <div className="App">
      <Table />
      <Chart />
    </div>
  );
};

export default App;
