import React from 'react';

const data = [
  { order: 1, qualification: 'STANDARD\nAGE : 16 years old or older', conditions: '16 - 99', status: 'Active' },
  { order: 2, qualification: 'STANDARD\nGENDER : All genders', conditions: 'One or more from: Female', status: 'Active' },
  { order: 3, qualification: 'STANDARD\nPincode', conditions: 'Any conditions pass', status: 'Active' },
  { order: 4, qualification: 'STANDARD\nAge & Gender', conditions: 'Any conditions pass', status: 'Active' },
];

const DataTable = () => {
  return (
    <div className="container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Qualification</th>
            <th>Conditions</th>
            <th>Status</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td data-label="Order">{row.order}</td>
              <td data-label="Qualification">
                <span className="standard">{row.qualification.split('\n')[0]}</span>
                <br />
                {row.qualification.split('\n')[1]}
              </td>
              <td data-label="Conditions">{row.conditions}</td>
              <td data-label="Status">{row.status}</td>
              <td data-label="Function">
                <div className="function-buttons">
                  <button>Edit</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = `
  .container {
    margin: 20px;
    font-family: Arial, sans-serif;
  }
  .data-table {
    width: 100%;
    border-collapse: collapse;
  }
  .data-table th, .data-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  .data-table th {
    background-color: #f2f2f2;
  }
  .data-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  .standard {
    color: #007bff;
  }
  .function-buttons {
    display: flex;
    flex-direction: column;
  }
  .function-buttons button {
    background: none;
    border: none;
    color: #007bff;
    text-align: left;
    padding: 2px 0;
    cursor: pointer;
  }
  .function-buttons button:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .data-table, .data-table thead, .data-table tbody, .data-table th, .data-table td, .data-table tr {
      display: block;
    }
    .data-table thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    .data-table tr {
      margin-bottom: 15px;
      border: 1px solid #ddd;
    }
    .data-table td {
      border: none;
      border-bottom: 1px solid #ddd;
      position: relative;
      padding-left: 50%;
      text-align: right;
    }
    .data-table td:before {
      content: attr(data-label);
      position: absolute;
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      text-align: left;
      font-weight: bold;
    }
    .data-table td:last-child {
      border-bottom: 0;
    }
    .function-buttons {
      flex-direction: row;
      justify-content: flex-end;
    }
    .function-buttons button {
      padding: 5px 10px;
      font-size: 14px;
    }
  }
`;

export default function Ibp() {
  return (
    <>
      <style>{styles}</style>
      <DataTable />
    </>
  );
}