import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AppBar, Box, Button, Container, TextField, Toolbar, Typography } from '@mui/material';
import CustomerTable from './components/CustomerTable'; // Import the CustomerTable component
import CustomerModal from './components/CustomerModal.js'; // Import the CustomerModal component

Modal.setAppElement('#root');

const API_URL = 'http://127.0.0.1:5000/api/customers'; // Define the API URL as a variable

function App() {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);
  
  useEffect(() => {
    console.log('Customers state updated:', customers); // Debugging log
  }, [customers]);
  
  function openModal(customer) {
    setCurrentCustomer(customer);
    setIsModalOpen(true);
  }
  function createCustomer(customer) {
    axios.post('http://127.0.0.1:5000/api/customers', customer)
      .then(response => {
        // alert(`New customer created successfully`);s
        setCustomers(prevCustomers => [...prevCustomers, response.data]);
        setIsModalOpen(false);
      })
      .catch(error => console.error('Error creating customer:', error));
    }

  const filteredData = filteredCustomers(customers);

  function fetchCustomers() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched customers:', data.customers);
        if (Array.isArray(data.customers)) {
          // const validCustomers = data.customers.filter(customer => {
          //   return customer && Object.keys(customer).length > 0 &&
          //     (customer.groupName || customer.contactPerson || customer.email || customer.phoneNumber);
          // });
          setCustomers(data.customers);
        } else {
          console.error('Fetched data is not an array:', data.customers);
        }
      })
      .catch(error => console.error('Error fetching customers:', error));
  }

  function handleSearchInput(event) {
    setSearchInput(event.target.value);
  }

  function filteredCustomers(customers) {
    return customers.filter(customer => {
      return Object.keys(customer).some(key =>
        customer[key] && customer[key].toString().toLowerCase().includes(searchInput.toLowerCase())
      );
    });
  }

  function saveCustomer(currentCustomer) {
    if (currentCustomer === null) {
      console.error('currentCustomer is null');
      return;
    }
    if (currentCustomer.Customer_id) {
      axios.put(`${API_URL}/${currentCustomer.Customer_id}`, currentCustomer)
        .then(response => {
          alert(`Customer with id ${currentCustomer.Customer_id} saved successfully`);
          setCustomers(prevCustomers => prevCustomers.map(c => c.Customer_id === currentCustomer.Customer_id ? response.data : c));
          setIsModalOpen(false);
        })
        .catch(error => console.error('Error saving customer:', error));
    } else {
      axios.post(API_URL, currentCustomer)
        .then(response => {
          alert(`New customer created successfully`);
          setCustomers(prevCustomers => [...prevCustomers, response.data]);
          setIsModalOpen(false);
        })
        .catch(error => console.error('Error creating customer:', error));
    }
  }

  function deleteCustomer(customer) {
    axios.delete(`${API_URL}/${customer.Customer_id}`)
      .then(response => {
        console.log(response.data.message);
        fetchCustomers();
      })
      .catch(error => console.error('Error:', error));
  }

  function cloneCustomer(customer) {
    axios.post(`${API_URL}/${customer.Customer_id}/clone`)
      .then(response => {
        fetchCustomers();
      })
      .catch(error => console.error(`Error cloning customer: ${error}`));
  }

  function exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'customers.xlsx');
  }
  
  function handleFileUpload(event) {
    if (window.confirm("This action will remove all current rows and replace them with records from the spreadsheet. Do you want to proceed?")) {
      // Delete all rows from the customer table
      axios.delete(API_URL+'/purge')
        .then(() => {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);

            // Ensure client_manager attribute is included
            const customersWithClientManager = json.map(customer => ({
              ...customer,
              client_manager: customer.client_manager || 'Unknown' // Default value if client_manager is missing
            }));

            // Update the state with the new customers
            setCustomers(customersWithClientManager);

            // Optionally, you can send the new customers to the server
            axios.post(API_URL, customersWithClientManager)
              .then(response => {
                console.log('Customers uploaded successfully:', response.data);
                fetchCustomers(); // Refresh the customer list
              })
              .catch(error => console.error('Error uploading customers:', error));
          };
          reader.readAsArrayBuffer(file);
        })
        .catch(error => console.error('Error deleting customers:', error));
    }
  }

  return (
    <div>
      <AppBar position="static" style={{ background: 'linear-gradient(to left, #000000, #434343)' }}>
        <Toolbar>
          <Typography variant="h4" style={{ flexGrow: 1 }}>
            Client List
          </Typography>
        </Toolbar>
      </AppBar>
      <Box mt={2}>
        <Container maxWidth="xl">
          <div className="App" style={{ paddingLeft: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <TextField
                label="Search..."
                value={searchInput}
                onChange={handleSearchInput}
                variant="outlined"
                size="small"
                style={{ padding: '5px', width: '300px' }}
              />
              <span>Total Customers: {filteredCustomers(customers).length}</span>
              <div>
                <Button variant="contained" color="primary" onClick={exportToExcel} style={{ marginRight: '20px' }}>
                  Export Excel
                </Button>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="fileUpload"
                />
                <label htmlFor="fileUpload">
                  <Button variant="contained" component="span" color="secondary">
                    Import Excel
                  </Button>
                </label>
              </div>
            </div>
            <div className="table-responsive" style={{ fontSize: '9px' }}>
              <CustomerTable
                customers={filteredCustomers(customers)}
                openModal={openModal}
                deleteCustomer={deleteCustomer}
                cloneCustomer={cloneCustomer}
              />
            </div>
          </div>
        </Container>
      </Box>
      <CustomerModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        currentCustomer={currentCustomer}
        setCurrentCustomer={setCurrentCustomer}
        saveCustomer={saveCustomer}
      />
    </div>
  );
}

export default App;