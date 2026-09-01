import React, { useState, useEffect } from "react";
import { Info, Search, ChevronLeft, ChevronRight } from "lucide-react";

const SurveyDashboard = () => {
    const [surveyData, setSurveyData] = useState([]);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.qmapi.com/research-surveys?page=${currentPage}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (data && Array.isArray(data.data)) {
                    setSurveyData(data.data);
                    setTotalPages(data.total_pages || 20);
                } else {
                    throw new Error('Invalid data format received');
                }
            } catch (err) {
                setError(err.message);
                console.error('Fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const handleNavigate = (id) => {
        window.location.href = `/survey/${id}`;
    };

    const handleInfoClick = (survey, e) => {
        e.stopPropagation();
        setSelectedSurvey(survey);
        setShowModal(true);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const filteredSurveys = surveyData.filter(survey => {
        const searchLower = searchQuery.toLowerCase();
        return survey.survey_id?.toString().includes(searchLower) ||
               survey.country_language?.toLowerCase().includes(searchLower) || 
               '';
    });

    const SurveyDetailsModal = ({ survey, onClose }) => {
        const formatPrecodes = (precodes) => {
            return precodes.join(", ");
        };

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Survey Details - {survey.survey_id}</h2>
                        <button className="close-button" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className="details-container">
                            <div className="section">
                                <h3>Quotas</h3>
                                <div className="table-wrapper">
                                    <table className="details-table">
                                        <thead>
                                            <tr>
                                                <th>Quota ID</th>
                                                <th>Type</th>
                                                <th>Respondents</th>
                                                <th>Conversion</th>
                                                <th>Question ID</th>
                                                <th>Operator</th>
                                                <th>Precodes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {survey.survey_quotas.map((quota) => (
                                                quota.questions.length > 0 ? 
                                                    quota.questions.map((q, qIndex) => (
                                                        <tr key={`${quota.id}-${qIndex}`}>
                                                            <td>{quota.survey_quota_id}</td>
                                                            <td>{quota.survey_quota_type}</td>
                                                            <td>{quota.number_of_respondents}</td>
                                                            <td>{quota.conversion}</td>
                                                            <td>{q.question_id}</td>
                                                            <td>{q.logical_operator}</td>
                                                            <td className="precodes-cell">{formatPrecodes(q.precodes)}</td>
                                                        </tr>
                                                    )) :
                                                    <tr key={quota.id}>
                                                        <td>{quota.survey_quota_id}</td>
                                                        <td>{quota.survey_quota_type}</td>
                                                        <td>{quota.number_of_respondents}</td>
                                                        <td>{quota.conversion}</td>
                                                        <td colSpan="3">No questions</td>
                                                    </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div className="section">
                                <h3>Qualifications</h3>
                                <div className="table-wrapper">
                                    <table className="details-table">
                                        <thead>
                                            <tr>
                                                <th>Question ID</th>
                                                <th>Logical Operator</th>
                                                <th>Precodes</th>
                                                <th>Created Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {survey.survey_qualifications.map((qual) => (
                                                <tr key={qual.id}>
                                                    <td>{qual.question_id}</td>
                                                    <td>{qual.logical_operator}</td>
                                                    <td className="precodes-cell">{formatPrecodes(qual.precodes)}</td>
                                                    <td>{new Date(qual.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="total-surveys">
                    Total Surveys: {filteredSurveys.length}
                </div>
                <div className="search-container">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Survey ID or Country..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>
            
            {error && (
                <div className="error-message">
                    Error loading data: {error}
                </div>
            )}
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Survey ID</th>
                            <th>Country/Language</th>
                            <th>LOI (mins)</th>
                            <th>IR (%)</th>
                            <th>Status</th>
                            <th>Revenue/Interview ($)</th>
                            <th>Remaining</th>
                            <th>Quota Type</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="9" className="loading-cell">Loading...</td>
                            </tr>
                        ) : filteredSurveys.length > 0 ? (
                            filteredSurveys.map((item) => (
                                <tr 
                                    key={item.survey_id} 
                                    onClick={() => handleNavigate(item.survey_id)}
                                    className={item.is_live ? 'active-row' : 'inactive-row'}
                                >
                                    <td>{item.survey_id}</td>
                                    <td>{item.country_language}</td>
                                    <td>{item.bid_length_of_interview}</td>
                                    <td>{item.bid_incidence}</td>
                                    <td>
                                        <span className={`status-badge ${item.is_live ? 'status-live' : 'status-offline'}`}>
                                            {item.is_live ? 'Live' : 'Offline'}
                                        </span>
                                    </td>
                                    <td>${item.revenue_per_interview?.value || "0.00"}</td>
                                    <td>{item.total_remaining}</td>
                                    <td>{item.survey_quota_calc_type}</td>
                                    <td>
                                        <button 
                                            className="info-button"
                                            onClick={(e) => handleInfoClick(item, e)}
                                        >
                                            <Info size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="no-data">No surveys found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {!isLoading && !error && (
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-button"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="page-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-button"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
            
            {showModal && selectedSurvey && (
                <SurveyDetailsModal 
                    survey={selectedSurvey} 
                    onClose={() => setShowModal(false)} 
                />
            )}
        </div>
    );
};

export default SurveyDashboard;