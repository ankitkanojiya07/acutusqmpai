import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./surveyPage.css";
import SurveyDetails from "../page-com/surveyDetail/surveyDetail";
import SurveyFields from "../page-com/surveyField/surveyField";
import Error from "../page-com/Error/Error";
import SurveyMetrics from "../page-com/surveyField/surveyMetrics";
import QuotaTable from "../components/quota/quota";
import Ibp from "../components/Quali/Quali";
import Loading from "../page-com/Loading/Loading";
import Navbar from "../components/Navbar/Navbar";

const SurveyForm = () => {
  const [industryLockOut, setIndustryLockOut] = useState(false);
  const { id } = useParams();
  const [liveUrl, setLiveUrl] = useState("");
  const [testUrl, setTestUrl] = useState("");
  const [formMetricsVisible, setFormMetricsVisible] = useState(true);
  const [surveyCPI, setSurveyCPI] = useState("");
  const [clientCPI, setClientCPI] = useState("");
  const [countryLang, setCountryLang] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formVisible, setFormVisible] = useState(true);
  const [expectedCompletes, setExpectedCompletes] = useState(0);
  const [expectedIncidenceRate, setExpectedIncidenceRate] = useState(0);
  const [expectedCompletionLOI, setExpectedCompletionLOI] = useState(0);
  const [dataset, setDataset] = useState({
    entrants: 0,
    prescreens: 0,
    completes: 0,
    conversionRate: 0,
    incidenceRate: 0,
    completionLOI: 0,
    terminationLOI: 0,
    dropoffRate: 0,
  });

  const [activeSection, setActiveSection] = useState("Detail"); // State for active section

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v2/survey/detail/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "authorization": "SampleApiKey",
          },
        });
        console.log(res.data);

        if (res.data.status === "success") {
          setLiveUrl(res.data.data.ClientSurveyLiveURL);
          setTestUrl(res.data.data.TestRedirectURL);
          setSurveyCPI(res.data.data.SurveyCPI);
          setClientCPI(res.data.data.ClientCPI);
          setExpectedCompletes(res.data.data.Completes);
          setExpectedCompletionLOI(res.data.data.LOI);
          setExpectedIncidenceRate(res.data.data.IR);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, [id]);

  const toggleFormVisibility = () => {
    setFormVisible((prevState) => !prevState);
  };

  const toggleFormMetricsVisibility = () => {
    setFormMetricsVisible((prevState) => !prevState);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section); // Update active section
  };


  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="survey-form-wrapper">
      <div className="toggle-button-container-1">
        <button id="idea" onClick={() => handleSectionChange("Detail")} className={activeSection === "Detail" ? "active" : ""}>
          Detail
        </button>
        <button id="idea" onClick={() => handleSectionChange("Qualification")} className={ activeSection === "Qualification" ? "active" : ""}>
          Qualification
        </button>
        <button id="idea" onClick={() => handleSectionChange("Quota")} className={activeSection === "Quota" ? "active" : ""}>
          Quota
        </button>
      </div>

      {activeSection === "Detail" && (
        <>
          {/* Detail Section (Existing Form and Metrics) */}
          <button onClick={toggleFormVisibility} className="toggle-button">
            {formVisible ? "Hide Sites Requirement" : "Show Sites Requirement"}
          </button>

          {formVisible && (
            <div className="form-container">
              <SurveyDetails countryLang={countryLang} />
              <SurveyFields
                liveUrl={liveUrl}
                setLiveUrl={setLiveUrl}
                testUrl={testUrl}
                setTestUrl={setTestUrl}
                surveyCPI={surveyCPI}
                setSurveyCPI={setSurveyCPI}
                clientCPI={clientCPI}
                setClientCPI={setClientCPI}
              />
            </div>
          )}

          <button onClick={toggleFormMetricsVisibility} className="toggle-button">
            {formMetricsVisible ? "Hide Metrics Requirement" : "Show Metrics Requirement"}
          </button>

          {formMetricsVisible && (
            <>
              <div className="form-container-value">
                <SurveyMetrics
                  expectedCompletes={expectedCompletes}
                  setExpectedCompletes={setExpectedCompletes}
                  expectedIncidenceRate={expectedIncidenceRate}
                  setExpectedIncidenceRate={setExpectedIncidenceRate}
                  expectedCompletionLOI={expectedCompletionLOI}
                  setExpectedCompletionLOI={setExpectedCompletionLOI}
                  dataset={dataset}
                  setDataset={setDataset}
                />
              </div>
              <button className="save-button">Save</button>
            </>
          )}
        </>
      )}

      {activeSection === "Qualification" && (
        <>
          {/* Qualification Section */}
          <div className="qualification-section">
            <h2>Qualification Section</h2>
            {/* Add the input fields or content for qualifications here */}
            <Ibp/>
          </div>
        </>
      )}

      {activeSection === "Quota" && (
        <>
          {/* Quota Section */}
          <div className="quota-section">
            <QuotaTable/>
      
          </div>
        </>
      )}
    </div>
  );
};

export default SurveyForm;;
  
        // const res = await axios.get(`http://localhost:3000/api/v2/survey/detail/${id}`, {
        