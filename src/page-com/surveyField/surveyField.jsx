import React from "react";
import "./surveyField.css";

const SurveyFields = ({
  liveUrl,
  setLiveUrl,
  testUrl,
  setTestUrl,
  surveyCPI,
  setSurveyCPI,
  clientCPI,
  setClientCPI
}) => {
  const handleCPIChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <div className="section-right">
      <div className="form-fields">
        <div className="form-group">
          <label>Survey CPI</label>
          <div className="currency-input">
            <span>EUR</span>
            <input
              type="number"
              placeholder="Survey CPI"
              value={surveyCPI}
              onChange={handleCPIChange(setSurveyCPI)}
              aria-label="Survey CPI"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Client CPI</label>
          <div className="currency-input">
            <span>EUR</span>
            <input
              type="number"
              placeholder="Client CPI"
              value={clientCPI}
              onChange={handleCPIChange(setClientCPI)}
              aria-label="Client CPI"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Live URL*</label>
          <input
            type="url"
            placeholder="Live Url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            aria-label="Live URL"
            required
          />
        </div>
        <div className="form-group">
          <label>Test URL</label>
          <input
            type="url"
            placeholder="Test Url"
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
            aria-label="Test URL"
          />
        </div>
        <div className="form-group">
          <label>Does your survey collect personal information?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="personalInfo"
                value="yes"
                aria-label="Personal Information Yes"
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="personalInfo"
                value="no"
                defaultChecked
                aria-label="Personal Information No"
              />{" "}
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyFields;
