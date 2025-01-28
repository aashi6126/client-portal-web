
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faClone, faSave, faCancel } from '@fortawesome/free-solid-svg-icons';



// changed

Modal.setAppElement('#root');

function App() {
  const [cnt, setCnt] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

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

  function saveCustomer(currentCustomer) {
    // alert(`Save customer with id ${currentCustomer.Customer_id}`);
    if (currentCustomer === null) {
      console.error('currentCustomer is null');
      return;
    }
    if (currentCustomer.Customer_id) {
      // Update existing customer
      axios.put(`http://127.0.0.1:5000/api/customers/${currentCustomer.Customer_id}`, currentCustomer)
        .then(response => {
          alert(`Customer with id ${currentCustomer.Customer_id} saved successfully`);
          setCustomers(prevCustomers => prevCustomers.map(c => c.Customer_id === currentCustomer.Customer_id ? response.data : c));
          setIsModalOpen(false);
        })
        .catch(error => console.error('Error saving customer:', error));
    } else {
      // Create new customer
      axios.post('http://127.0.0.1:5000/api/customers', currentCustomer)
        .then(response => {
          alert(`New customer created successfully`);
          setCustomers(prevCustomers => [...prevCustomers, response.data]);
          setIsModalOpen(false);
        })
        .catch(error => console.error('Error creating customer:', error));
    }
  }

  function deleteCustomer(customer) {
    // alert(`Delete customer with id ${customer.Customer_id}`);
    axios.delete(`http://127.0.0.1:5000/api/customers/${customer.Customer_id}`)
      .then(response => {
        console.log(response.data.message);
        // Here you can update your state or UI to reflect the deletion
        // setCustomers(prevCustomers => prevCustomers.filter(c => c.Customer_id !== customer.Customer_id));
        fetchCustomers();
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    
  }

function cloneCustomer(customer) {
  console.log('Cloning customer with id', customer.Customer_id);
  
  axios.post(`http://127.0.0.1:5000/api/customers/${customer.Customer_id}/clone`)
    .then(response => {
      console.log(response);
      // Re-fetch the customers
      fetchCustomers();
    })
    .catch(error => {
      console.error(`Error cloning customer: ${error}`);
    });
}

function fetchCustomers() {
  // alert('Fetching customers');
  fetch('http://127.0.0.1:5000/api/customers')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched customers:', data.customers); // Debugging log
      if (Array.isArray(data.customers)) {
        setCustomers(data.customers);
      } else {
        console.error('Fetched data is not an array:', data.customers);
      }
    })
    .catch(error => console.error('Error fetching customers:', error));
}
const [searchInput, setSearchInput] = useState('');

function handleSearchInput(event) {
  setSearchInput(event.target.value);
}

function filteredCustomers(customers) {
  return customers.filter(customer => {
    return Object.keys(customer).some(key =>
      customer[key].toString().toLowerCase().includes(searchInput.toLowerCase())
    );
  });
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
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    //console.log('Imported data:', jsonData); // Debugging log
    jsonData.forEach(customer => createCustomer(customer));
    setCustomers(jsonData);
  };
  reader.readAsArrayBuffer(file);
}
const filteredData = filteredCustomers(customers);

const tableStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse',
  backgroundColor: 'lightblue', // Add this line
};

const cellStyle = {
  border: '1px solid black',
  padding: '10px',
};

console.log('Customers state before rendering:', customers); // Debugging log

  return (
    <>
    
      <div className="App"  style={{ paddingLeft: '10px' }}>
      <h1>Client List</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchInput}
          style={{ padding: '5px', width: '300px' }}
        />
        <span>Total Customers: {customers.length}</span>
        <div>
          <button onClick={exportToExcel} className="btn btn-primary btn-sm" style={{ marginRight: '20px' }}>
            Export Excel
          </button>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="btn btn-secondary btn-sm">
            Import Excel
          </label>
        </div>
      </div>
      <div className="table-responsive" style={{ fontSize: '9px' }}>
        
        <table id='Customer' className="table table-striped table-bordered" data-search="true">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Renewal Date</th>
              <th scope="col">Other Broker</th>
              <th scope="col">Group Name</th>
              <th scope="col">Contact Person</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Funding</th>
              <th scope="col">Current Carrier</th>
              <th scope="col">Emp at renewal</th>
              <th scope="col">Waiting Period</th>
              <th scope="col">Deductible Accumulation</th>
              <th scope="col">Previous Carrier</th>
              <th scope="col">Cobra Carrier</th>
              <th scope="col">Dental Effective Date</th>
              <th scope="col">Dental Carrier</th>
              <th scope="col">Vision Effective Date</th>
              <th scope="col">Vision Carrier</th>
              <th scope="col">Life ADnD Effective Date</th>
              <th scope="col">Life ADnD Carrier</th>
              <th scope="col">LTD Effective Date</th>
              <th scope="col">LTD Carrier</th>
              <th scope="col">STD Effective Date</th>
              <th scope="col">STD Carrier</th>
              <th scope="col">401K Effective Date</th>
              <th scope="col">401K Carrier</th>
              <th scope="col">Employer</th>
              <th scope="col">Employee</th>
              <th scope="col">Product</th>
              <th scope="col">Client Manager</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map(customer => (
              <tr key={customer.Customer_id}>
                <td>{customer.Renewal_Date}</td>
                <td>{customer.Other_Broker}</td>
                <td>{customer.Group_Name}</td>
                <td>{customer.Contact_Person}</td>
                <td>{customer.Email}</td>
                <td>{customer.Phone_Number}</td>
                <td>{customer.Funding}</td>
                <td>{customer.Current_Carrier}</td>
                <td>{customer.Num_Employees_At_Renewal}</td>
                <td>{customer.Waiting_Period}</td>
                <td>{customer.Deductible_Accumulation}</td>
                <td>{customer.Previous_Carrier}</td>
                <td>{customer.Cobra_Carrier}</td>
                <td>{customer.Dental_Effective_Date}</td>
                <td>{customer.Dental_Carrier}</td>
                <td>{customer.Vision_Effective_Date}</td>
                <td>{customer.Vision_Carrier}</td>
                <td>{customer.Life_And_ADND_Effective_Date}</td>
                <td>{customer.Life_And_ADND_Carrier}</td>
                <td>{customer.LTD_Effective_Date}</td>
                <td>{customer.LTD_Carrier}</td>
                <td>{customer.STD_Effective_Date}</td>
                <td>{customer.STD_Carrier}</td>
                <td>{customer.Effective_Date_401K}</td>
                <td>{customer.Carrier_401K}</td>
                <td>{customer.Employer}</td>
                <td>{customer.Employee}</td>
                <td>{customer.Product}</td>
                <td>{customer.Client_Manager}</td>
                {/* Add all other data here */}
                <td style={{ width: '200px' }}>
                    <button style={{ marginRight: '4px' }} className="btn btn-outline-primary btn-sm" onClick={() => openModal(customer)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => deleteCustomer(customer)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button className="btn btn-outline-info btn-sm" onClick={() => cloneCustomer(customer)}>
                      <FontAwesomeIcon icon={faClone} />
                    </button>
                  </td>
              </tr>
            )) 
            ) : (
              <tr>
                <td colSpan="29">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* The modal */}
          <Modal isOpen={isModalOpen} onRequestClose={saveCustomer} >
            {/* Your form for editing the customer here */}
            <form style={{ fontSize: '9px' }}>
            <h2>Edit Client Information</h2>
              {currentCustomer && (
                <>
                <div className="row">
                  <div className="form-group col">
                    <label htmlFor="Renewal_Date">Renewal Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Renewal_Date"
                      value={currentCustomer.Renewal_Date}
                      onChange={(e) =>
                        setCurrentCustomer({
                          ...currentCustomer,
                          Renewal_Date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="Other_Broker">Other Broker</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Other_Broker"
                      value={currentCustomer.Other_Broker}
                      onChange={(e) =>
                        setCurrentCustomer({
                          ...currentCustomer,
                          Other_Broker: e.target.value,
                        })
                      }
                    />
                  </div>
                  </div>
                  <div className="row">
                  <div className="form-group col">
                    <label htmlFor="Group_Name">Group Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Group_Name"
                      value={currentCustomer.Group_Name}
                      onChange={(e) =>
                        setCurrentCustomer({
                          ...currentCustomer,
                          Group_Name: e.target.value,
                        })
                      }
                    />
                  </div>
                <div className="form-group col">
                  <label htmlFor="Contact_Person">Contact Person</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Contact_Person"
                    value={currentCustomer.Contact_Person}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Contact_Person: e.target.value,
                      })
                    }
                  />
                </div>
                </div>
                <div className="row">
                  <div className="form-group col">
                    <label htmlFor="Email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Email"
                      value={currentCustomer.Email}
                      onChange={(e) =>
                        setCurrentCustomer({
                          ...currentCustomer,
                          Email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="Phone_Number">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Phone_Number"
                      value={currentCustomer.Phone_Number}
                      onChange={(e) =>
                        setCurrentCustomer({
                          ...currentCustomer,
                          Phone_Number: e.target.value,
                        })
                      }
                    />
                  </div>
                  </div>
                <div className="row">
                <div className="form-group col">
                  <label htmlFor="Funding">Funding</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Funding"
                    value={currentCustomer.Funding}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Funding: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="Current_Carrier">Current Carrier</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Current_Carrier"
                    value={currentCustomer.Current_Carrier}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Current_Carrier: e.target.value,
                      })
                    }
                  />
                </div>
                </div>
                <div className="row">
                <div className="form-group col">
                  <label htmlFor="Emp_at_renewal">Emp at renewal</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Emp_at_renewal"
                    value={currentCustomer.Num_Employees_At_Renewal}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Num_Employees_At_Renewal: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="Waiting_Period">Waiting Period</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Waiting_Period"
                    value={currentCustomer.Waiting_Period}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Waiting_Period: e.target.value,
                      })
                    }
                  />
                </div>
                </div>
                <div className="row">
                <div className="form-group col">
                  <label htmlFor="Deductible_Accumulation">Deductible Accumulation</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Deductible_Accumulation"
                    value={currentCustomer.Deductible_Accumulation}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Deductible_Accumulation: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="Previous_Carrier">Previous Carrier</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Previous_Carrier"
                    value={currentCustomer.Previous_Carrier}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Previous_Carrier: e.target.value,
                      })
                    }
                  />
                </div>
                </div>
                <div className="row">
                <div className="form-group col">
                  <label htmlFor="Cobra_Carrier">Cobra Carrier</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Cobra_Carrier"
                    value={currentCustomer.Cobra_Carrier}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Cobra_Carrier: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="Dental_Effective_Date">Dental Effective Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Dental_Effective_Date"
                    value={currentCustomer.Dental_Effective_Date}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Dental_Effective_Date: e.target.value,
                      })
                    }
                  />
                </div>
                </div>
                <div className="row">
                <div className="form-group col">
                  <label htmlFor="Dental_Carrier">Dental Carrier</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Dental_Carrier"
                    value={currentCustomer.Dental_Carrier}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Dental_Carrier: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="Vision_Effective_Date">Vision Effective Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Vision_Effective_Date"
                    value={currentCustomer.Vision_Effective_Date}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Vision_Effective_Date: e.target.value,
                      })
                    }
                  />
                </div>
                </div>
                <div className="row">
                <div className="form-group col">
                  <label htmlFor="Vision_Carrier">Vision Carrier</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Vision_Carrier"
                    value={currentCustomer.Vision_Carrier}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Vision_Carrier: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="Life_ADnD_Effective_Date">Life ADnD Effective Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Life_ADnD_Effective_Date"
                    value={currentCustomer.Life_And_ADND_Effective_Date}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Life_And_ADND_Effective_Date: e.target.value,
                      })
                    }
                  />
                </div>
                </div>
                <div className="row">
                <div className="form-group col">
                  <label htmlFor="Life_ADnD_Carrier">Life ADnD Carrier</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Life_ADnD_Carrier"
                    value={currentCustomer.Life_And_ADND_Carrier}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Life_And_ADND_Carrier: e.target.value,
                        
                      })
                    }
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="LTD_Effective_Date">LTD Effective Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="LTD_Effective_Date"
                    value={currentCustomer.LTD_Effective_Date}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        LTD_Effective_Date: e.target.value,
                      })
                    }
                  />
                </div>
                </div>
                <div className="row">
                <div className="form-group col">
                  <label htmlFor="LTD_Carrier">LTD Carrier</label>
                  <input
                    type="text"
                    className="form-control"
                    id="LTD_Carrier"
                    value={currentCustomer.LTD_Carrier}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        LTD_Carrier: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="STD_Effective_Date">STD Effective Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="STD_Effective_Date"
                    value={currentCustomer.STD_Effective_Date}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        STD_Effective_Date: e.target.value,
                      })
                    }
                  />
                </div>
                </div>
                <div className="row">
                <div className="form-group col">
                  <label htmlFor="STD_Carrier">STD Carrier</label>
                  <input
                    type="text"
                    className="form-control"
                    id="STD_Carrier"
                    value={currentCustomer.STD_Carrier}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        STD_Carrier: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="_401K_Effective_Date">401K Effective Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="_401K_Effective_Date"
                    value={currentCustomer.Effective_Date_401K}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Effective_Date_401K: e.target.value,
                      })
                    }
                      />
                </div>
                </div>
                <div className="row">
                <div className="form-group col">
                  <label htmlFor="_401K_Carrier">401K Carrier</label>
                  <input
                    type="text"
                    className="form-control"
                    id="_401K_Carrier"
                    value={currentCustomer.Carrier_401K}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Carrier_401K: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="Employer">Employer</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Employer"
                    value={currentCustomer.Employer}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Employer: e.target.value,
                      })
                    }
                  />
                </div>
                </div>
                <div className="row">
                <div className="form-group col">
                  <label htmlFor="Employee">Employee</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Employee"
                    value={currentCustomer.Employee}
                    onChange={(e) =>
                      setCurrentCustomer({
                        ...currentCustomer,
                        Employee: e.target.value,
                      })
                    }
                    />
                    </div>
                    
                    <div className="form-group col">
                      <label htmlFor="Product">Product</label>
                      <input
                        type="text"
                        className="form-control"
                        id="product"
                        value={currentCustomer.Product}
                        onChange={(e) =>
                          setCurrentCustomer({
                            ...currentCustomer,
                            Product: e.target.value,
                          })
                        }
                  />
                  <div className="row">
                    <div className="form-group col">
                        <label htmlFor="Client_Manager">Client Manager</label>
                        <input
                          type="text"
                          className="form-control"
                          id="Client_Manager"
                          value={currentCustomer.Client_Manager}
                          onChange={(e) =>
                            setCurrentCustomer({
                              ...currentCustomer,
                              Client_Manager: e.target.value,
                            })
                          }
                    />
                    <div className="form-group col">
                      s
                    </div>
                  </div>
                  </div>
                </div>
                </div>
              
              <button  className="btn btn-outline-primary btn-sm" onClick={() => saveCustomer(currentCustomer)}>Save</button>
              <button   className="btn btn-outline-primary btn-sm" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </>
              )}
            </form>
          </Modal>          
      </div>
      </div>
    </>
  );
}
export default App;


