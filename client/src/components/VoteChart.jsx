import { useEffect } from "react";

const VoteChart = ({ yAxisLabel, chartData, dataFormat }) => {
  useEffect(() => {
    // Ensure Google Charts library is loaded before drawing the chart
    if (window.google && window.google.charts) {
      drawChart();
    } else {
      console.warn('Google Charts library not loaded. Please ensure it\'s loaded before this component.');
    }
  }, [dataFormat]);

  // default chartOptions and will not be changed in this project.
  const chartOptions = {
    title: 'Election Results',
    isStacked: true,
    hAxis: {title: 'Teams'},
    vAxis: {title: yAxisLabel || 'Votes'},
    colors: ['#3366CC', '#f4d100', '#DC3912', '#f4730e', '#118207'], // Customizing colors for each party,
    annotations: {
      textStyle: {
        fontSize: 12,
        bold: true,
        color: 'black'
      }
    },
    animation: {
      startup: true,
      duration: 1000,
      easing: 'out',
    }
  };

  function drawChart() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(function () {
      var data = google.visualization.arrayToDataTable(chartData);

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, chartOptions);
    });
  }

  return (
      <div id="chart_div" ></div>
  );
};

export default VoteChart;
