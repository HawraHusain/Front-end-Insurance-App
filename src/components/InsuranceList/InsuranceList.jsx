// InsuranceList.js
import React from 'react';
import { Link } from 'react-router';

const InsuranceList = ({ insurance }) => {
  return (
    <div>
      <h2>Insurance Policies</h2>
      <ul>
        {insurance.map((ins) => (
          <li key={ins._id}>
            <Link to={`/insurance/${ins._id}`}>{ins.policyNo} - {ins.category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InsuranceList;
