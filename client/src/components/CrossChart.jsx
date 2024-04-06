import './CrossChart.css';

/*
* This component is a simple cross chart just made using a simple table in
*  html, css.
*
* Send in the data as a object which looks like a table when expanded
* */
const CrossChart = ({ title, data, isPercentage }) => {
  return (
      <div className="container">
        <div className="cross-graph">
          {/*
              Teens     Youngsters    Adults      Seniors
           __________________________________________________
   Team1   |   2134  |     3134     |    3241    |   13421   |
   Team2   |   2134  |     3134     |    3241    |   13421   |
   Team3   |   2134  |     3134     |    3241    |   13421   |
   Team4   |   2134  |     3134     |    3241    |   13421   |
           __________________________________________________
      */}
          <div className="chart-row labels-row">
            <span className="col-label-cell chart-cell row-label-cell">{"\\"}</span>
            <div className="row-values">
              {
                Object.keys(data.TDP).map((name, index) => (
                    <span className="chart-cell row-label-cell" key={index}>
                    {name.toUpperCase()}
                  </span>
                ))
              }
            </div>
          </div>
          {
            Object.keys(data).map((name, index) => (
                <div className="chart-row" >
                  <span className="chart-cell col-label-cell" key={index}>{name}</span>
                  <div className="row-values">
                    {
                      Object.values(data[name]).map((val, index) => (
                          <span className="chart-cell" key={index}>{val}{isPercentage ? "%" : ""}</span>
                      ))
                    }
                  </div>
                </div>
            ))
          }
          <br/>
          <h3 className="chart-title" align="center">{title}</h3>
        </div>
      </div>
  )
};

export default CrossChart;