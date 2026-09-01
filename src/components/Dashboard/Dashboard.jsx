import React, { useState } from 'react';
import './Dashboard.css';
import All from '../Link/All';
import Live from '../Link/Live';
import Finished from '../Link/Finished';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('live');

    const tabs = [
        { id: 'live', label: 'Surveys' },
        
        // { id: 'finished', label: 'Finished' },
        // { id: 'all', label: 'All' }
        
    ];

    return (
        <div className="dashboard">
            <div className="tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="content">
                {activeTab === 'live' &&<Live/> }
                {/* {activeTab === 'finished' && <div><Finished/></div>}
                {activeTab === 'all' && <div><All/></div>} */}
            </div>
        </div>
    );
};

export default Dashboard;
