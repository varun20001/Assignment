import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as echarts from "echarts";
import style from "./style.module.scss";

const BarChart = ({ data, name, metric }) => {
  const chartRef = useRef(null);
  const [selectedSeries, setSelectedSeries] = useState("New");

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);

    const prepareChartData = (metric) => {
      const dates = Object.keys(data).sort();
      const newData = dates.map((date) => data[date].new[metric]);
      const usedData = dates.map((date) => data[date].used[metric]);
      const cpoData = dates.map((date) => data[date].cpo[metric]);

      return {
        dates: dates.map((date) => new Date(date).toLocaleDateString()),
        newData,
        usedData,
        cpoData,
      };
    };

    const chartData = prepareChartData(metric);

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },

      xAxis: {
        type: "category",
        data: chartData.dates,
      },
      yAxis: {
        type: "value",
        min: 0,
        max: metric === "avgMsrp" ? 100000 : 10,
        interval: metric === "avgMsrp" ? 10000 : 1,
        axisLabel: {
          formatter: (value) => {
            if (metric === "avgMsrp") {
              return `$${value / 1000}k`;
            }
            return value;
          },
        },
      },

      series: [
        {
          name: "New",
          type: "bar",
          data: selectedSeries === "New" ? chartData.newData : [],
          itemStyle: {
            color: "#ff9926",
          },
        },
        {
          name: "Used",
          type: "bar",
          data: selectedSeries === "Used" ? chartData.usedData : [],
          itemStyle: {
            color: "#ff9926",
          },
        },
        {
          name: "CPO",
          type: "bar",
          data: selectedSeries === "CPO" ? chartData.cpoData : [],
          itemStyle: {
            color: "#ff9926",
          },
        },
      ],
    };

    myChart.setOption(option);

    // Cleanup function
    return () => {
      myChart.dispose();
    };
  }, [data, selectedSeries]);

  return (
    <div>
      <div style={{ marginTop: "10px" }} className={style.bar_header_wrap}>
        <div className={style.bar_header}>{name}</div>
        <div
          onClick={() => setSelectedSeries("New")}
          className={
            selectedSeries === "New"
              ? style.active_button
              : style.inactive_button
          }
        >
          NEW
        </div>
        <div
          onClick={() => setSelectedSeries("Used")}
          className={
            selectedSeries === "Used"
              ? style.active_button
              : style.inactive_button
          }
        >
          USED
        </div>
        <div
          onClick={() => setSelectedSeries("CPO")}
          className={
            selectedSeries === "CPO"
              ? style.active_button
              : style.inactive_button
          }
        >
          CPO
        </div>
      </div>
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default BarChart;
