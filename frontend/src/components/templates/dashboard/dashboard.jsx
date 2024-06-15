import { useEffect, useState } from "react";
import Header from "../../organisms/Header/Header.jsx";
import StatsHeader from "../../organisms/statsHeader/index.jsx";
import axios from "axios";
import BarChart from "../../organisms/BarCharts/index.jsx";
import History from "../../organisms/history/index.jsx";
import style from "./style.module.scss";
const Dashboard = () => {
  const [data, setData] = useState({});
  const [totalData, setTotalData] = useState({});
  const [filter, setFilter] = useState({ make: [], duration: ["this-year"] });
  const [confirmfilter, setConfirmFilter] = useState({
    make: [],
    duration: ["this-year"],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/inventory?make=${filter.make}&duration=${filter.duration}`
        );
        await setData(response.data.aggregatedData);
        await setTotalData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [filter]);
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Header />
      <div
        className="dashboard_outer_wrap"
        style={{ padding: "35px", background: "#F5F5F5" }}
      >
        <StatsHeader
          data={totalData}
          handleFilterChange={handleFilterChange}
          filter={filter}
          setFilter={setFilter}
          setConfirmFilter={setConfirmFilter}
          confirmfilter={confirmfilter}
        />
        <BarChart data={data} name={"Inventory Count"} metric={"count"} />
        <BarChart data={data} name={"Average MSRP in USD"} metric={"avgMsrp"} />
        <div className={style.bar_header}>History Log</div>
        <History data={data} />
      </div>
    </>
  );
};
export default Dashboard;
