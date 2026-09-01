import React from "react";
import "./surveyMetrics.css";

const SurveyMetrics = ({
  expectedCompletes,
  setExpectedCompletes,
  expectedIncidenceRate,
  setExpectedIncidenceRate,
  expectedCompletionLOI,
  setExpectedCompletionLOI,
  dataset,
  setDataset
}) => {

  const handleChange = (e) => {
    const { id, value } = e.target;
    setDataset(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  return (
    <div className="sm-survey-metrics-container">
      <div className="sm-metrics-card">
        <div className="sm-metrics-input-group">
          <label>Expected Completes</label>
          <input
            type="number"
            placeholder="0"
            value={expectedCompletes}
            onChange={(e) => setExpectedCompletes(e.target.value)}
          />
        </div>
        <div className="sm-metrics-input-group">
          <label>Expected Incidence Rate *</label>
          <input
            type="number"
            placeholder="0"
            value={expectedIncidenceRate}
            onChange={(e) => setExpectedIncidenceRate(e.target.value)}
          />
        </div>
        <div className="sm-metrics-input-group">
          <label>Expected Completion LOI *</label>
          <input
            type="number"
            placeholder="0"
            value={expectedCompletionLOI}
            onChange={(e) => setExpectedCompletionLOI(e.target.value)}
          />
        </div>
      </div>
      <div className="sm-in-field-data">
        <h3 className="sm-data-section-title">In-Field Data</h3>
        <div className="sm-data-grid">
          <div className="sm-data-item">
            <label htmlFor="entrants">Entrants</label>
            <input
              id="entrants"
              type="number"
              value={dataset.entrants}
              disabled
            //   onChange={handleChange}
            />
          </div>
          <div className="sm-data-item">
            <label htmlFor="prescreens">Prescreens</label>
            <input
              id="prescreens"
              type="number"
              value={dataset.prescreens}
              disabled
            //   onChange={handleChange}
            />
          </div>
          <div className="sm-data-item">
            <label htmlFor="completes">Completes</label>
            <input
              id="completes"
              type="number"
              value={dataset.completes}
              disabled

            //   onChange={handleChange}
            />
          </div>
          <div className="sm-data-item">
            <label htmlFor="conversionRate">Conversion Rate</label>
            <div className="sm-input-with-unit">
              <input
                id="conversionRate"
                type="number"
                disabled
                value={dataset.conversionRate}
                // onChange={handleChange}
              />
              <span className="sm-unit">%</span>
            </div>
          </div>
          <div className="sm-data-item">
            <label htmlFor="incidenceRate">Incidence Rate</label>
            <div className="sm-input-with-unit">
              <input
                id="incidenceRate"
                type="number"
                value={dataset.incidenceRate}
                disabled
                // onChange={handleChange}
              />
              <span className="sm-unit">%</span>
            </div>
          </div>
          <div className="sm-data-item">
            <label htmlFor="completionLOI">Completion LOI</label>
            <div className="sm-input-with-unit">
              <input
                id="completionLOI"
                type="number"
                value={dataset.completionLOI}
                // onChange={handleChange}
                disabled
              />
              <span className="sm-unit">min</span>
            </div>
          </div>
          <div className="sm-data-item">
            <label htmlFor="terminationLOI">Termination LOI</label>
            <div className="sm-input-with-unit">
              <input
                id="terminationLOI"
                type="number"
                value={dataset.terminationLOI}
                // onChange={handleChange}
                disabled
              />
              <span className="sm-unit">min</span>
            </div>
          </div>
          <div className="sm-data-item">
            <label htmlFor="dropoffRate">Dropoff Rate</label>
            <div className="sm-input-with-unit">
              <input
                id="dropoffRate"
                type="number"
                value={dataset.dropoffRate}
                // onChange={handleChange}
                disabled

/>
              <span className="sm-unit">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyMetrics;
