import React, { useState } from 'react';
import axios from 'axios';

interface Data {
  [key: string]: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<Data>({});
  const [tableData, setTableData] = useState<Data[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    axios.post('http://localhost:8080/process-form', formData)
      .then(response => {
        const jsonData = response.data;
        const arr = [jsonData['firstName'], jsonData['lastName']];
        setTableData(arr);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const renderTable = () => {
    if (!tableData || tableData.length === 0) {
      return null;
    }
  
    const columns = Object.keys(tableData[0]);
  
    return (
      <table>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" onChange={handleChange} placeholder="First Name" />
        <input type="text" name="lastName" onChange={handleChange} placeholder="Last Name" />
        <button type="submit">Submit</button>
      </form>
      {renderTable()}
    </div>
  );
};

export default App;