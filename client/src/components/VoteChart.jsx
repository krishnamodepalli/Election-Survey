import { useEffect } from "react";

import useFetchVoteData from "../hooks/useFetchVoteData.jsx";

const VoteChart = () => {
  useEffect(() => {
    // Ensure Google Charts library is loaded before drawing the chart
    if (window.google && window.google.charts) {
      drawChart();
    } else {
      console.warn('Google Charts library not loaded. Please ensure it\'s loaded before this component.');
    }
  }, []);

  useFetchVoteData();
  // get the data from localStorage
  const data = JSON.parse(localStorage.getItem("votes"));
  const chartData = [
    ['Team', 'YCP', { role: 'annotation' }, 'TDP', { role: 'annotation' }, 'JSP', { role: 'annotation' }, 'BJP', { role: 'annotation' }, 'INC', { role: 'annotation' }],
    ['YCP', data.YCP, data.YCP.toString(), 0, '', 0, '', 0, '', 0, ''],
    ['TDP + JSP + BJP', 0, '', data.TDP, data.TDP.toString(), data.JSP, data.JSP.toString(), data.BJP, data.BJP.toString(), 0, ''],
    ['INC', 0, '', 0, '', 0, '', 0, '', data.INC, data.INC.toString()]
  ];

  const chartOptions = {
    title: 'Election Results',
    isStacked: true,
    hAxis: {title: 'Teams'},
    vAxis: {title: 'Total Votes'},
    colors: ['#3366CC', '#f4d100', '#DC3912', '#f4730e', '#118207'], // Customizing colors for each party,
    annotations: {
      textStyle: {
        fontSize: 12,
        bold: true,
        color: 'black'
      }
    }
  };

  function drawChart() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(function() {
      var data = google.visualization.arrayToDataTable(chartData);

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, chartOptions);
    });
  }

  return (
      <div id="chart_div" style={{
        width: "900px",
        height: "500px",
      }}></div>
  );
};

export default VoteChart;
