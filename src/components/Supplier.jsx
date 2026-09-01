import React, { useState } from 'react';
import axios from 'axios';

const BuyerSupplierForm = () => {
  const [formType, setFormType] = useState('buyer'); // Toggle between 'buyer' and 'supplier'
  const [buyer, setBuyer] = useState({ AccountName: '', BusinessUnitID: '' });
  const [api, setApi] = useState("");
  const [supplier, setSupplier] = useState({
    AccountName: '',
    BusinessUnitID: '',
    SupplierName: '',
    StatusLink: ''
  });
  const [apikey, setApiKey] = useState("");

  const handleBuyerChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSupplierChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const submitBuyerForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/create', buyer, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setApi(response.data.data.ApiKey);
    } catch (error) {
      console.error('Error creating buyer:', error);
    }
  };

  const submitSupplierForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/supply/create', supplier, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setApiKey(response.data.data.ApiKey);
    } catch (error) {
      console.error('Error creating supplier:', error);
    }
  };

  return (
    <div className="container" style={styles.container}>
      {/* Toggle Buttons */}
      <div style={styles.toggleContainer}>
        <button
          onClick={() => setFormType('buyer')}
          style={formType === 'buyer' ? styles.activeButton : styles.button}
        >
          Buyer Form
        </button>
        <button
          onClick={() => setFormType('supplier')}
          style={formType === 'supplier' ? styles.activeButton : styles.button}
        >
          Supplier Form
        </button>
      </div>

      {/* Buyer Form */}
      {formType === 'buyer' && (
        <div style={styles.formContainer}>
          <h2>Create Buyer</h2>
          <form onSubmit={submitBuyerForm}>
            <div style={styles.formGroup}>
              <label>Account Name</label>
              <input
                type="text"
                name="AccountName"
                value={buyer.AccountName}
                onChange={handleBuyerChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Business Unit ID</label>
              <input
                type="number"
                name="BusinessUnitID"
                value={buyer.BusinessUnitID}
                onChange={handleBuyerChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <button type="submit" style={styles.button}>
                Create Buyer
              </button>
            </div>
          </form>

          {/* Display Buyer API Key */}
          {api && (
            <div style={styles.apiContainer}>
              <label>Buyer API Key</label>
              <input type="text" value={api} readOnly style={styles.apiInput} />
            </div>
          )}
        </div>
      )}

      {/* Supplier Form */}
      {formType === 'supplier' && (
        <div style={styles.formContainer}>
          <h2>Create Supplier</h2>
          <form onSubmit={submitSupplierForm}>
            <div style={styles.formGroup}>
              <label>Account Name</label>
              <input
                type="text"
                name="AccountName"
                value={supplier.AccountName}
                onChange={handleSupplierChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Business Unit ID</label>
              <input
                type="number"
                name="BusinessUnitID"
                value={supplier.BusinessUnitID}
                onChange={handleSupplierChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Supplier Name</label>
              <input
                type="text"
                name="SupplierName"
                value={supplier.SupplierName}
                onChange={handleSupplierChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Status Link</label>
              <input
                type="text"
                name="StatusLink"
                value={supplier.StatusLink}
                onChange={handleSupplierChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <button type="submit" style={styles.button}>
                Create Supplier
              </button>
            </div>
          </form>

          {/* Display Supplier API Key */}
          {apikey && (
            <div style={styles.apiContainer}>
              <label>Supplier API Key</label>
              <input type="text" value={apikey} readOnly style={styles.apiInput} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px',
    backgroundColor: '#f5f5f5',
  },
  toggleContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#f0f0f0',
    color: '#000',
    padding: '10px 20px',
    margin: '0 10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    margin: '0 10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '20px',
    width: '45%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  apiContainer: {
    marginTop: '20px',
  },
  apiInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
    color: '#555',
  },
};

export default BuyerSupplierForm;
