import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const QuotaTable = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://api.qmapi.com/api/v2/survey/qualification/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "authorization": "SampleApiKey",
          }
        });
        setData(res.data.data.Quota);
        setError(null);

        console.log(res.data.data)
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="loading"></div>;
  if (error) return <p className="error-message">{error}</p>;
  if (!data || !Array.isArray(data) || data.length === 0) return <p>No data available.</p>;

  return (
    <div className="quota-table-container">
      <div className="quota-table">
        <div className="table-header">
          <div>Quota ID</div>
          <div>Name</div>
          <div>Quota Type</div>
          <div>Field Target</div>
          <div>Quota</div>
          <div>Prescreens</div>
          <div>Completes</div>
          <div>Active</div>
        </div>
        <div className="table-body">
          {data.map((item) => (
            <div key={item.SurveyQuotaID} className="table-row">
              <div data-label="Quota ID">{item.SurveyQuotaID}</div>
              <div data-label="Name">{item.Name}</div>
              <div data-label="Quota Type">{item.SurveyQuotaType}</div>
              <div data-label="Field Target">{item.FieldTarget}</div>
              <div data-label="Quota">{item.Quota}</div>
              <div data-label="Prescreens">{item.Prescreens}</div>
              <div data-label="Completes">{item.Completes}</div>
              <div data-label="Active">{item.IsActive ? "Yes" : "No"}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .quota-table-container {
          font-family: 'Arial', sans-serif;
          max-width: 100%;
          overflow-x: auto;
          margin: 20px 0;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        .quota-table {
          width: 100%;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
        }

        .table-header {
          display: flex;
          background-color: #4CAF50;
          color: #ffffff;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .table-header div {
          flex: 1;
          padding: 12px 15px;
          text-align: left;
        }

        .table-body .table-row {
          display: flex;
          border-bottom: 1px solid #dddddd;
        }

        .table-body .table-row:nth-of-type(even) {
          background-color: #f3f3f3;
        }

        .table-body .table-row:last-of-type {
          border-bottom: 2px solid #4CAF50;
        }

        .table-body .table-row:hover {
          background-color: #f5f5f5;
          transition: background-color 0.3s ease;
        }

        .table-body .table-row div {
          flex: 1;
          padding: 12px 15px;
          text-align: left;
        }

        .error-message {
          color: #ff0000;
          text-align: center;
          padding: 20px;
          font-weight: bold;
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
        }

        .loading:after {
          content: " ";
          display: block;
          width: 64px;
          height: 64px;
          margin: 8px;
          border-radius: 50%;
          border: 6px solid #4CAF50;
          border-color: #4CAF50 transparent #4CAF50 transparent;
          animation: loading 1.2s linear infinite;
        }

        @keyframes loading {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media screen and (max-width: 600px) {
          .table-header {
            display: none;
          }

          .table-body .table-row {
            flex-direction: column;
            padding: 8px 0;
          }

          .table-body .table-row div {
            text-align: right;
            padding: 8px 15px;
            position: relative;
          }

          .table-body .table-row div::before {
            content: attr(data-label);
            position: absolute;
            left: 6px;
            width: 45%;
            padding-right: 10px;
            white-space: nowrap;
            font-weight: bold;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default QuotaTable;
