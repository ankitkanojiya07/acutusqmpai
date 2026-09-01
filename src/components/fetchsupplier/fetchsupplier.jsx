// FetchSupplier.js
import React, { useState, useEffect, useMemo } from "react";
import "./FetchSupplier.css";

const SEARCH_FIELDS = {
  accountName: "Account Name",
  supplierID: "Supplier ID",
  supplierName: "Supplier Name",
};

const TABLE_HEADERS = [
  "Account Name",
  "Account ID",
  "API Key",
  "Business Unit ID",
  "Supplier ID",
  "Rate Card",
  "Quality",
  "Complete",
  "Termination",
  "Over Quota",
  "Supplier Name",
  "Supplier Email",
  "Password",
  "Hashing Key",
  "Actions",
];

const EMPTY_SUPPLIER = {
  AccountName: "",
  AccountID: "",
  ApiKey: "",
  BusinessUnitID: "",
  SupplierID: "",
  RateCard: "",
  Quality: "",
  Complete: "",
  Termination: "",
  OverQuota: "",
  SupplierName: "",
  SupplierEmail: "",
  Password: "",
  HashingKey: "",
};

const FetchSupplier = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState(
    Object.keys(SEARCH_FIELDS).reduce((acc, key) => ({ ...acc, [key]: "" }), {})
  );
  const [editingRows, setEditingRows] = useState(new Set());
  const [newRow, setNewRow] = useState(null);
  const [editData, setEditData] = useState({});
  const [submitting, setSubmitting] = useState(new Set());

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(searchParams).every(([key, value]) => {
        if (!value.trim()) return true;

        const itemValue = String(
          item[key.charAt(0).toUpperCase() + key.slice(1)] || ""
        );
        return itemValue.toLowerCase().includes(value.toLowerCase().trim());
      });
    });
  }, [data, searchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://api.qmapi.com/supplies");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (Array.isArray(result.data)) {
        setData(result.data);
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch supplier data");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (name, value) => {
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSupplier = () => {
    setNewRow({ ...EMPTY_SUPPLIER });
    setEditingRows(new Set());
  };

  const handleNewRowChange = (field, value) => {
    setNewRow((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditRowChange = (index, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
      },
    }));
  };

  const handleSubmitNewRow = async () => {
    try {
      setSubmitting((prev) => new Set([...prev, "new"]));

      const response = await fetch("https://api.qmapi.com/createSupply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Add the new supplier to the data
      setData((prev) => [...prev, result.data || newRow]);
      setNewRow(null);

      alert("Supplier created successfully!");
    } catch (err) {
      alert(`Failed to create supplier: ${err.message}`);
      console.error("Error creating supplier:", err);
    } finally {
      setSubmitting((prev) => {
        const newSet = new Set(prev);
        newSet.delete("new");
        return newSet;
      });
    }
  };

  const handleCancelNewRow = () => {
    setNewRow(null);
  };

  const handleEditRow = (index) => {
    setEditingRows((prev) => new Set([...prev, index]));
    setEditData((prev) => ({
      ...prev,
      [index]: { ...filteredData[index] },
    }));
  };

  const handleSubmitEdit = async (index) => {
    try {
      const rowData = editData[index];
      const accountID = rowData.AccountID;

      setSubmitting((prev) => new Set([...prev, index]));

      const response = await fetch(
        `https://api.qmapi.com/updateSupply/${accountID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rowData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the data in state
      setData((prev) =>
        prev.map((item) => (item.AccountID === accountID ? rowData : item))
      );

      // Remove from editing state
      setEditingRows((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });

      // Clean up edit data
      setEditData((prev) => {
        const newData = { ...prev };
        delete newData[index];
        return newData;
      });

      alert("Supplier updated successfully!");
    } catch (err) {
      alert(`Failed to update supplier: ${err.message}`);
      console.error("Error updating supplier:", err);
    } finally {
      setSubmitting((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }
  };

  const handleCancelEdit = (index) => {
    setEditingRows((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
    setEditData((prev) => {
      const newData = { ...prev };
      delete newData[index];
      return newData;
    });
  };

  const renderTableCell = (item, field, index, isEditing) => {
    if (isEditing) {
      return (
        <input
          type="text"
          value={editData[index]?.[field] || ""}
          onChange={(e) => handleEditRowChange(index, field, e.target.value)}
          className="edit-input"
        />
      );
    }
    return item[field];
  };

  const renderNewRowCell = (field) => {
    return (
      <input
        type="text"
        value={newRow?.[field] || ""}
        onChange={(e) => handleNewRowChange(field, e.target.value)}
        className="edit-input"
        placeholder={`Enter ${field}`}
      />
    );
  };

  return (
    <div className="supplier-container">
      <header className="supplier-header">
        <div className="search-controls">
          <button
            className="add-supplier-btn"
            onClick={handleAddSupplier}
            disabled={newRow !== null}
          >
            Add Supplier
          </button>

          <div className="search-inputs">
            {Object.entries(SEARCH_FIELDS).map(([key, label]) => (
              <input
                key={key}
                type="text"
                className="search-input"
                placeholder={`Search ${label.toLowerCase()}...`}
                value={searchParams[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            ))}
          </div>

          <button
            className="refresh-btn"
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>

          <div className="results-count">Results: {filteredData.length}</div>
        </div>
      </header>

      <main className="supplier-content">
        {error ? (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        ) : loading ? (
          <div className="loading-message">
            <div className="loading-spinner"></div>
            <p>Loading supplier data...</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="supplier-table">
              <thead>
                <tr>
                  {TABLE_HEADERS.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* New Row */}
                {newRow && (
                  <tr className="new-row">
                    <td>{renderNewRowCell("AccountName")}</td>
                    <td>{renderNewRowCell("AccountID")}</td>
                    <td>{renderNewRowCell("ApiKey")}</td>
                    <td>{renderNewRowCell("BusinessUnitID")}</td>
                    <td>{renderNewRowCell("SupplierID")}</td>
                    <td>{renderNewRowCell("RateCard")}</td>
                    <td>{renderNewRowCell("Quality")}</td>
                    <td>{renderNewRowCell("Complete")}</td>
                    <td>{renderNewRowCell("Termination")}</td>
                    <td>{renderNewRowCell("OverQuota")}</td>                    <td>{renderNewRowCell("SupplierName")}</td>
                    <td>{renderNewRowCell("SupplierEmail")}</td>
                    <td>{renderNewRowCell("Password")}</td>
                    <td>{renderNewRowCell("HashingKey")}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="submit-btn"
                          onClick={handleSubmitNewRow}
                          disabled={submitting.has("new")}
                        >
                          {submitting.has("new") ? "Submitting..." : "Submit"}
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={handleCancelNewRow}
                          disabled={submitting.has("new")}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Existing Rows */}
                {filteredData.length === 0 && !newRow ? (
                  <tr>
                    <td colSpan={TABLE_HEADERS.length} className="no-results">
                      No matching suppliers found. Try adjusting your search
                      criteria.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => {
                    const isEditing = editingRows.has(index);
                    return (
                      <tr
                        key={index}
                        className={isEditing ? "editing-row" : ""}
                      >
                        <td>
                          {renderTableCell(
                            item,
                            "AccountName",
                            index,
                            isEditing
                          )}
                        </td>
                        <td>
                          {renderTableCell(item, "AccountID", index, isEditing)}
                        </td>
                        <td>
                          {renderTableCell(item, "ApiKey", index, isEditing)}
                        </td>
                        <td>
                          {renderTableCell(
                            item,
                            "BusinessUnitID",
                            index,
                            isEditing
                          )}
                        </td>
                        <td>
                          {renderTableCell(
                            item,
                            "SupplierID",
                            index,
                            isEditing
                          )}
                        </td>
                        <td>
                          {renderTableCell(item, "RateCard", index, isEditing)}
                        </td>
                        <td>
                          {renderTableCell(item, "Quality", index, isEditing)}
                        </td>
                        <td>
                          {renderTableCell(item, "Complete", index, isEditing)}
                        </td>
                        <td>
                          {renderTableCell(
                            item,
                            "Termination",
                            index,
                            isEditing
                          )}
                        </td>
                        <td>
                          {renderTableCell(item, "OverQuota", index, isEditing)}
                        </td>
                        <td>                          {renderTableCell(
                            item,
                            "SupplierName",
                            index,
                            isEditing
                          )}
                        </td>
                        <td>
                          {renderTableCell(
                            item,
                            "SupplierEmail",
                            index,
                            isEditing
                          )}
                        </td>
                        <td>
                          {renderTableCell(
                            item,
                            "Password",
                            index,
                            isEditing
                          )}
                        </td>
                        <td>
                          {renderTableCell(
                            item,
                            "HashingKey",
                            index,
                            isEditing
                          )}
                        </td>
                        <td>
                          <div className="action-buttons">
                            {isEditing ? (
                              <>
                                <button
                                  className="submit-btn"
                                  onClick={() => handleSubmitEdit(index)}
                                  disabled={submitting.has(index)}
                                >
                                  {submitting.has(index)
                                    ? "Submitting..."
                                    : "Submit"}
                                </button>
                                <button
                                  className="cancel-btn"
                                  onClick={() => handleCancelEdit(index)}
                                  disabled={submitting.has(index)}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                className="edit-btn"
                                onClick={() => handleEditRow(index)}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default FetchSupplier;
