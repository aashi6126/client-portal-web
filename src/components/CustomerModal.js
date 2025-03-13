// FILE: ./components/CustomerModal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CustomerModal = ({ isOpen, onRequestClose, currentCustomer, setCurrentCustomer, saveCustomer }) => {
    return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} >
                {
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
                          
                        </div>
                      </div>
                      </div>
                    </div>
                    </div>
                  
                  <button  className="btn btn-outline-primary btn-sm" onClick={() => saveCustomer(currentCustomer)}>Save</button>
                  <button   className="btn btn-outline-primary btn-sm" onClick={() => isOpen(false)}>Cancel</button>
                  </>
                  )}
                </form>
    }
              </Modal>     
                
  );
};

export default CustomerModal;