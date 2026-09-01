import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Loader2, Download, Search, RefreshCw, Calendar } from 'lucide-react';

const styles = {
  container: `
  .container {
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
  }
`,
card: `
  .card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    padding: 20px 24px;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
  }

  .card-content {
    padding: 24px;
  }
`,
controls: `
  .input-group {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
  }

  .input-wrapper {
    flex: 1;
    position: relative;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
  }

  .input {
    width: 100%;
    padding: 10px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }

  .input:focus {
    border-color: #2563eb;
  }

  .input.with-icon {
    padding-left: 40px;
  }

  .button {
    padding: 10px 20px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.2s;
    min-width: 120px;
    justify-content: center;
  }

  .button:hover {
    background: #1d4ed8;
  }

  .button:disabled {
    background: #93c5fd;
    cursor: not-allowed;
  }

  .button-outline {
    background: white;
    color: #2563eb;
    border: 1px solid #2563eb;
  }

  .button-outline:hover {
    background: #f8fafc;
  }
`,
table: `
  .table-container {
    overflow-x: auto;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  .table th {
    background: #f8fafc;
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: #475569;
    border-bottom: 1px solid #e2e8f0;
  }

  .table td {
    padding: 12px 16px;
    border-bottom: 1px solid #e2e8f0;
  }

  .table tbody tr:hover {
    background: #f8fafc;
  }
`,
alert: `
  .alert {
    padding: 16px;
    border-radius: 6px;
    margin-bottom: 24px;
    background: #fee2e2;
    color: #b91c1c;
    border: 1px solid #fecaca;
  }

  .empty-message {
    text-align: center;
    padding: 32px;
    color: #64748b;
  }
`,
  dateControls: `
    .date-range {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }

    .date-input-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .date-label {
      font-size: 14px;
      color: #475569;
      font-weight: 500;
    }

    .date-input {
      width: 100%;
      padding: 10px 16px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }

    .date-input:focus {
      border-color: #2563eb;
    }
  `
};

const SurveyReporting = () => {
  const [supplyId, setSupplyId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Add styles to document
  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = Object.values({ ...styles, dateControls: styles.dateControls }).join('\n');
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  const fetchSurveyData = async (supplyId) => {
    if (!supplyId) return null;
    
    try {
      const response = await fetch(
        `https://api.qmapi.com/api/v2/survey/reporting/${supplyId}`,
        { 
          headers: { 
            authorization: "SampleApiKey",
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      throw new Error('Failed to fetch survey data: ' + error.message);
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    ['surveyData', supplyId],
    () => fetchSurveyData(supplyId),
    {
      enabled: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const filteredData = React.useMemo(() => {
    if (!data) return [];
    
    return data.filter(item => {
      // Search term filter
      const matchesSearch = Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Date range filter
      const updatedAt = item.updatedAt ? new Date(item.updatedAt) : null;
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;
      
      const matchesDateRange = 
        (!fromDate || (updatedAt && updatedAt >= fromDate)) &&
        (!toDate || (updatedAt && updatedAt <= new Date(toDate.setHours(23, 59, 59, 999))));
      
      return matchesSearch && matchesDateRange;
    });
  }, [data, searchTerm, dateFrom, dateTo]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  const handleFetchClick = () => {
    if (!supplyId.trim()) {
      alert('Please enter a Supply ID');
      return;
    }
    refetch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetchClick();
    }
  };

  const downloadCSV = () => {
    if (!filteredData.length) return;

    const headers = [
      'Panelist ID', 'AID', 'Created At', 'Updated At', 'Status',
      'Survey ID', 'Survey Name', 'Country', 'CPI', 'IR', 'LOI'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => [
        row.panelistId,
        row.AID,
        formatDate(row.createdAt),
        formatDate(row.updatedAt),
        row.status || '-',
        row.SurveyID,
        `"${(row.SurveyName || '').replace(/"/g, '""')}"`,
        row.country_language,
        row.cpi || '-',
        row.IR || '-',
        row.LOI || '-'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `survey-data-${supplyId}-${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Survey Reporting Dashboard</h2>
          {data && (
            <button onClick={downloadCSV} className="button button-outline">
              <Download size={16} />
              Export CSV
            </button>
          )}
        </div>
        <div className="card-content">
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter Supply ID"
                value={supplyId}
                onChange={(e) => setSupplyId(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input"
              />
            </div>
            <button
              onClick={handleFetchClick}
              disabled={isLoading}
              className="button"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Loading
                </>
              ) : (
                <>
                  <RefreshCw size={16} />
                  Fetch Data
                </>
              )}
            </button>
          </div>

          {data && (
            <>
              <div className="date-range">
                <div className="date-input-wrapper">
                  <label className="date-label">From Date</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="date-input"
                  />
                </div>
                <div className="date-input-wrapper">
                  <label className="date-label">To Date</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="date-input"
                  />
                </div>
              </div>

              <div className="input-wrapper" style={{ marginBottom: '24px' }}>
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search in results..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input with-icon"
                />
              </div>
            </>
          )}

          {isError && (
            <div className="alert">
              {error.message}
            </div>
          )}

          {data && (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Panelist ID</th>
                    <th>AID</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Status</th>
                    <th>Survey ID</th>
                    <th>Survey Name</th>
                    <th>Country</th>
                    <th>CPI</th>
                    <th>IR</th>
                    <th>LOI</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.panelistId}</td>
                      <td>{row.AID}</td>
                      <td>{formatDate(row.createdAt)}</td>
                      <td>{formatDate(row.updatedAt)}</td>
                      <td>{row.status || '-'}</td>
                      <td>{row.SurveyID}</td>
                      <td>{row.SurveyName}</td>
                      <td>{row.country_language}</td>
                      <td>{row.cpi || '-'}</td>
                      <td>{row.IR || '-'}</td>
                      <td>{row.LOI || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredData.length === 0 && (
                <div className="empty-message">
                  No results found for your search criteria
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyReporting;