import React from "react";

const SurveyDetails = ({ countryLang }) => {
  return (
    <div className="section-left">
      <div className="form-group">
        <label>Study Type*</label>
        <input type="text" value="Adhoc" disabled />
      </div>
      <div className="form-group">
        <label>Business Unit*</label>
        <input type="text" value="Services Beta Migration - EUR" disabled />
      </div>
      <div className="form-group">
        <label>Industry*</label>
        <input type="text" placeholder="Other" aria-label="Industry" />
      </div>
      <div className="form-group">
        <label>Country - Language*</label>
        <input
          type="text"
          value={countryLang || "Loading..."}
          disabled
          aria-label="Country Language"
        />
      </div>
    </div>
  );
};

export default SurveyDetails;
