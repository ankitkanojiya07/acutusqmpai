import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./All.css";

const SurveyList = () => {
    const [surveyData, setSurveyData] = useState([]);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://api.qmapi.com/api/v2/survey", {
                    headers: {
                        authorization: "SampleApiKey" // Replace `token` with your actual token variable
                    }
                });
                if (res.data.status === 'success') {
                    setSurveyData(res.data.data);
                }
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const handleNavigate = (id) => {
        navigate(`/survey/${id}`); // Use navigate function here
    };

    return (
        <div className="survey-list-container">
            
            <table className="survey-table">
                <thead>
                    <tr>
                        <th>Survey</th>
                        <th>Progress</th>
                        <th>Completes</th>
                        <th>Avg. CPI ($)</th>
                        <th>IR</th>
                        <th>LOI</th>
                    </tr>
                </thead>
                <tbody>
                    {surveyData.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <div className="survey-name" onClick={() => handleNavigate(item.id)}>
                                    <input type="checkbox" />
                                    <span>{item.SurveyName}</span>
                                </div>
                                <div className="survey-id">#{item.id}</div>
                                <div className="survey-status">{item.status}</div>
                            </td>
                            <td>
                                <div className="progress-bar">
                                    <div className="progress" style={{ width: `${(item.Completes / item.TotalQuota) * 100}%` }}></div>
                                </div>
                                <div className="progress-text">{item.Completes} / {item.Quota} completes</div>
                            </td>
                            <td>{item.Completes}</td>
                            <td>{item.ClientCPI?.toFixed(2) || "0.00"}</td>
                            <td>{item.IR}%</td>
                            <td>{item.LOI}m</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SurveyList;
