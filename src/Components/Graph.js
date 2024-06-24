import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';
// import Loading from './Loading';


function Graph({setError}) {
  const [sentimentalValue, setSentimentalValue] = useState({
    positive: '',
    negative: '',
    neutral: ''
  });
  const [loading, setLoading] = useState(false)

  let chart = null;

  const getChartData = async () => {
    try {
      setLoading(true)
      const response = await axios.get("https://sendiment-analysis-backend.onrender.com/api/graph");
      if (response.data.success) {
        setSentimentalValue(response.data.value);
        const dataValues = [
          response.data.value.neutral || sentimentalValue.neutral,
          response.data.value.negative || sentimentalValue.negative,
          response.data.value.positive || sentimentalValue.positive
        ];
        setLoading(false)

    
        const options = {
          series: dataValues,
          colors: ["#E8F52A", "#E91A3F", "#27E393"],
          chart: {
            height: 420,
            width: "100%",
            type: "pie",
          },
          stroke: {
            colors: ["white"],
            lineCap: "",
          },
          plotOptions: {
            pie: {
              labels: {
                show: true,
              },
              size: "100%",
              dataLabels: {
                offset: -25
              }
            },
          },
          labels: ["Neutral", "Negative", "Positive"],
          dataLabels: {
            enabled: true,
            style: {
              fontFamily: "Inter, sans-serif",
            },
          },
          legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return value + "%";
              },
            },
          },
          xaxis: {
            labels: {
              formatter: function (value) {
                return value + "%";
              },
            },
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
          },
        };

        if (chart) {
          chart.updateOptions(options);
        } else {
          chart = new ApexCharts(document.getElementById("pie-chart"), options);
          chart.render();
        }
      }
    } catch (error) {
      setLoading(false)
      setError(error.message)
      console.error(error);
    }
  };
  
  useEffect(() => {
    getChartData();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

 
  return (
    <>
      <div className="max-w-sm w-96  mt-5 mr-5 bg-gray-200  rounded-lg shadow  bg-opacity-70  p-4 md:p-6">
        <div className="flex justify-between items-start w-full">
          <div className="flex-col items-center">
            <div className="flex items-center mb-1">
              <h5 className="text-xl font-bold leading-none text-gray-900 text-center dark:text-gray-900 me-1">Sentimental Analysis</h5>
            </div>
          </div>
        </div>
        <div className="py-6" id="pie-chart"></div>
      </div>
    </>
  );
}

export default Graph;
