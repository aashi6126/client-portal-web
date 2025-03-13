// FILE: ./components/CustomerTable.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faClone } from '@fortawesome/free-solid-svg-icons';

const tableStyle = {
  width: '100%',
  border: '1px solid black',
  borderCollapse: 'collapse',
  backgroundColor: 'lightblue',
  fontSize: '10px',
};

const cellStyle = {
  border: '1px solid black',
  padding: '10px',
};

const CustomerTable = ({ customers, openModal, deleteCustomer, cloneCustomer }) => {
  return (
    <table style={tableStyle} className="table table-striped table-bordered table-sm table-responsive">
      <thead className="thead-dark">
        <tr>
        <th scope="col">Actions</th>
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

        </tr>
      </thead>
      <tbody>
        {Array.isArray(customers) && customers.length > 0 ? (
          customers.map(customer => (
            <tr key={customer.Customer_id}>
              <td style={{ width: '400px' }}>
                <button style={{ marginRight: '4px', marginTop: '2px' }} className="btn btn-outline-primary btn-sm" onClick={() => openModal(customer)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button style={{ marginRight: '4px', marginTop: '2px' }} className="btn btn-outline-danger btn-sm" onClick={() => deleteCustomer(customer)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button style={{ marginRight: '4px', marginTop: '2px' }} className="btn btn-outline-info btn-sm" onClick={() => cloneCustomer(customer)}>
                  <FontAwesomeIcon icon={faClone} />
                </button>
              </td>
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
              
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="29" style={cellStyle}>No customers found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CustomerTable;