import React, { useState, useEffect, useMemo } from 'react';
import './FetchInfo.css';

const SEARCH_FIELDS = {
  id: 'ID',
  sessionID: 'Session ID',
  supplyID: 'Supply ID',
  surveyID: 'Survey ID',
  userID: 'User ID',
  dtectScore: 'Dtect Score',
  status: 'Status',
  countryLanguage: 'Country/Language',
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleString();
};

// Function to calculate time difference between two dates
const getTimeDifference = (updatedAt, createdAt) => {
  if (!updatedAt || !createdAt) return '-';
  
  const updated = new Date(updatedAt);
  const created = new Date(createdAt);
  
  // Calculate difference in milliseconds
  const diffMs = updated - created;
  
  if (diffMs <= 0) return '0s';
  
  // Convert to days, hours, minutes, seconds
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  
  // Format the time difference
  let result = '';
  if (days > 0) result += `${days}d `;
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m `;
  if (seconds > 0) result += `${seconds}s`;
  
  return result.trim();
};

// Function to calculate the average time difference in milliseconds
const calculateAverageTimeDiff = (data) => {
  if (!data || data.length === 0) return null;
  
  let totalMs = 0;
  let validItems = 0;
  
  data.forEach(item => {
    if (item.updatedAt && item.createdAt) {
      const diff = new Date(item.updatedAt) - new Date(item.createdAt);
      if (diff > 0) {
        totalMs += diff;
        validItems++;
      }
    }
  });
  
  if (validItems === 0) return null;
  return totalMs / validItems;
};

// Function to format milliseconds as human-readable time
const formatMsToHumanReadable = (ms) => {
  if (ms === null) return '-';
  
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;
  
  let result = '';
  if (days > 0) result += `${days}d `;
  if (remainingHours > 0) result += `${remainingHours}h `;
  if (remainingMinutes > 0) result += `${remainingMinutes}m `;
  if (remainingSeconds > 0) result += `${remainingSeconds}s`;
  
  return result.trim() || '0s';
};

const escapeCSV = (value) => {
  if (value === null || value === undefined) return '';
  const stringValue = String(value);
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

const FetchInfo = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState(
    Object.keys(SEARCH_FIELDS).reduce((acc, key) => ({ ...acc, [key]: '' }), {})
  );
  const [dateFilters, setDateFilters] = useState({
    createdAt: { from: '', to: '' },
    updatedAt: { from: '', to: '' }
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'id',
    direction: 'ascending'
  });

  // Prepare data with all fields
  const preparedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      countryLanguage: item.country_language || '-',
      revenueValue: item.revenue_value || '-',
      relativeTime: getTimeDifference(item.updatedAt, item.createdAt)
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    return preparedData.filter((item) => {
      // Text search filters
      const textFiltersPassed = Object.entries(searchParams).every(([key, searchValue]) => {
        if (!searchValue.trim()) return true;
        
        const fieldMapping = {
          id: 'id',
          sessionID: 'SessionID',
          supplyID: 'SupplyID',
          surveyID: 'SurveyID',
          userID: 'UserID',
          dtectScore: 'dtectScore',
          status: 'status',
          countryLanguage: 'countryLanguage'
        };
        
        let itemValue;
        if (key === 'countryLanguage') {
          itemValue = item.countryLanguage;
        } else if (key === 'dtectScore') {
          itemValue = String(item.dtectScore || '');
        } else {
          itemValue = String(item[fieldMapping[key]] || '');
        }
        return itemValue.toLowerCase().includes(searchValue.toLowerCase().trim());
      });

      if (!textFiltersPassed) return false;

      // Date filters
      const createdDate = new Date(item.createdAt);
      const updatedDate = new Date(item.updatedAt);

      // Created At date range filter
      if (dateFilters.createdAt.from && createdDate < new Date(dateFilters.createdAt.from)) {
        return false;
      }
      if (dateFilters.createdAt.to && createdDate > new Date(dateFilters.createdAt.to + 'T23:59:59')) {
        return false;
      }

      // Updated At date range filter
      if (dateFilters.updatedAt.from && updatedDate < new Date(dateFilters.updatedAt.from)) {
        return false;
      }
      if (dateFilters.updatedAt.to && updatedDate > new Date(dateFilters.updatedAt.to + 'T23:59:59')) {
        return false;
      }

      return true;
    });
  }, [preparedData, searchParams, dateFilters]);

  // Apply sorting to the filtered data
  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        // Handle different data types appropriately
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Special handling for date fields
        if (sortConfig.key === 'createdAt' || sortConfig.key === 'updatedAt') {
          aValue = new Date(aValue || 0).getTime();
          bValue = new Date(bValue || 0).getTime();
        } 
        // Special handling for relativeTime (convert to milliseconds for sorting)
        else if (sortConfig.key === 'relativeTime') {
          aValue = a.updatedAt && a.createdAt ? new Date(a.updatedAt) - new Date(a.createdAt) : 0;
          bValue = b.updatedAt && b.createdAt ? new Date(b.updatedAt) - new Date(b.createdAt) : 0;
        }
        // Special handling for dtectScore and revenueValue (numeric comparison)
        else if (sortConfig.key === 'dtectScore' || sortConfig.key === 'revenueValue') {
          aValue = aValue === '-' ? -1 : parseFloat(aValue);
          bValue = bValue === '-' ? -1 : parseFloat(bValue);
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  // Calculate average relative time
  const averageRelativeTime = useMemo(() => {
    const avgMs = calculateAverageTimeDiff(filteredData);
    return formatMsToHumanReadable(avgMs);
  }, [filteredData]);

  // Check if any search filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.values(searchParams).some(value => value.trim() !== '') || 
           dateFilters.createdAt.from || 
           dateFilters.createdAt.to || 
           dateFilters.updatedAt.from || 
           dateFilters.updatedAt.to;
  }, [searchParams, dateFilters]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch data from the new endpoint
      const response = await fetch('https://api.qmapi.com/acuadmin');
      const result = await response.json();

      setData(result.data || []);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (name, value) => {
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field, range, value) => {
    setDateFilters(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [range]: value
      }
    }));
  };

  // Function to handle column header clicks for sorting and refreshing data
  const handleHeaderClick = (key) => {
    // First refresh the data
    fetchData();
    
    // Then handle sorting
    setSortConfig(prevSortConfig => ({
      key,
      direction:
        prevSortConfig.key === key && prevSortConfig.direction === 'ascending'
          ? 'descending'
          : 'ascending'
    }));
  };

  // Function to get the appropriate sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '⇅';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const exportToExcel = () => {
    try {
      const headers = [
        'ID',
        'Session ID',
        'Supply ID',
        'Survey ID',
        'User ID',
        'Initial Status',
        'Client Status',
        'Status',
        'IP Address',
        'Country/Language',
        'Revenue Value',
        'Dtect Score',
        'Created At',
        'Updated At',
        'Relative Time'
      ];

      const csvContent = [
        headers.map(escapeCSV).join(','),
        ...sortedData.map(item => [
          escapeCSV(item.id),
          escapeCSV(item.SessionID),
          escapeCSV(item.SupplyID),
          escapeCSV(item.SurveyID),
          escapeCSV(item.UserID),
          escapeCSV(item.InitialStatus),
          escapeCSV(item.ClientStatus),
          escapeCSV(item.status),
          escapeCSV(item.IPAddress),
          escapeCSV(item.countryLanguage),
          escapeCSV(item.revenueValue),
          escapeCSV(item.dtectScore),
          escapeCSV(formatDate(item.createdAt)),
          escapeCSV(formatDate(item.updatedAt)),
          escapeCSV(item.relativeTime)
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `user_data_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
      setError('Failed to export data. Please try again.');
    }
  };

  return (
    <div className="fetch-info-container">
      <header className="search-header">
        <div className="search-container">
          {Object.entries(SEARCH_FIELDS).map(([key, label]) => (
            <input
              key={key}
              className="search-input"
              placeholder={label}
              value={searchParams[key]}
              onChange={(e) => handleInputChange(key, e.target.value)}
            />
          ))}
          <div className="date-filters">
            <div className="date-filter-group">
              <label>Date</label>
              <input
                type="date"
                className="date-input"
                value={dateFilters.updatedAt.from}
                onChange={(e) => handleDateChange('updatedAt', 'from', e.target.value)}
                placeholder="From"
              />
              <input
                type="date"
                className="date-input"
                value={dateFilters.updatedAt.to}
                onChange={(e) => handleDateChange('updatedAt', 'to', e.target.value)}
                placeholder="To"
              />
            </div>
          </div>
          <div className="avg-time-container">
            <span className="avg-label">Avg Time:</span>
            <span className="avg-value" title="Average Relative Time">
              {hasActiveFilters ? averageRelativeTime : '-'}
            </span>
          </div>
          <button 
            className="refresh-button"
            onClick={fetchData}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
          <button
            className="export-button"
            onClick={exportToExcel}
            disabled={isLoading || sortedData.length === 0}
          >
            Export to Excel
          </button>
          <span className="results-count">
            Results: {sortedData.length}
          </span>
        </div>
      </header>

      <div className="content-container">
        {error ? (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th onClick={() => handleHeaderClick('id')} className="sortable-header">
                    ID {getSortIndicator('id')}
                  </th>
                  <th onClick={() => handleHeaderClick('SessionID')} className="sortable-header">
                    Session ID {getSortIndicator('SessionID')}
                  </th>
                  <th onClick={() => handleHeaderClick('SupplyID')} className="sortable-header">
                    Supply ID {getSortIndicator('SupplyID')}
                  </th>
                  <th onClick={() => handleHeaderClick('SurveyID')} className="sortable-header">
                    Survey ID {getSortIndicator('SurveyID')}
                  </th>
                  <th onClick={() => handleHeaderClick('UserID')} className="sortable-header">
                    User ID {getSortIndicator('UserID')}
                  </th>
                  <th onClick={() => handleHeaderClick('InitialStatus')} className="sortable-header">
                    Initial Status {getSortIndicator('InitialStatus')}
                  </th>
                  <th onClick={() => handleHeaderClick('ClientStatus')} className="sortable-header">
                    Client Status {getSortIndicator('ClientStatus')}
                  </th>
                  <th onClick={() => handleHeaderClick('status')} className="sortable-header">
                    Status {getSortIndicator('status')}
                  </th>
                  <th onClick={() => handleHeaderClick('IPAddress')} className="sortable-header">
                    IP Address {getSortIndicator('IPAddress')}
                  </th>
                  <th onClick={() => handleHeaderClick('countryLanguage')} className="sortable-header">
                    Country/Language {getSortIndicator('countryLanguage')}
                  </th>
                  <th onClick={() => handleHeaderClick('revenueValue')} className="sortable-header">
                    Revenue Value {getSortIndicator('revenueValue')}
                  </th>
                  <th onClick={() => handleHeaderClick('dtectScore')} className="sortable-header">
                    Dtect Score {getSortIndicator('dtectScore')}
                  </th>
                  <th onClick={() => handleHeaderClick('createdAt')} className="sortable-header">
                    Created At {getSortIndicator('createdAt')}
                  </th>
                  <th onClick={() => handleHeaderClick('updatedAt')} className="sortable-header">
                    Updated At {getSortIndicator('updatedAt')}
                  </th>
                  <th onClick={() => handleHeaderClick('relativeTime')} className="sortable-header">
                    Relative Time {getSortIndicator('relativeTime')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="15" className="loading-cell">Loading...</td>
                  </tr>
                ) : sortedData.length === 0 ? (
                  <tr>
                    <td colSpan="15" className="no-results">No results found</td>
                  </tr>
                ) : (
                  sortedData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.SessionID}</td>
                      <td>{item.SupplyID}</td>
                      <td>{item.SurveyID}</td>
                      <td>{item.UserID}</td>
                      <td>{item.InitialStatus}</td>
                      <td>{item.ClientStatus}</td>
                      <td>{item.status}</td>
                      <td>{item.IPAddress}</td>
                      <td>{item.countryLanguage}</td>
                      <td>{item.revenueValue}</td>
                      <td>{item.dtectScore}</td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>{formatDate(item.updatedAt)}</td>
                      <td>{item.relativeTime}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchInfo;