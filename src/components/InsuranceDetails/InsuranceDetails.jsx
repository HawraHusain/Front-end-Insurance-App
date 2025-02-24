// InsuranceDetails.js
import React from 'react';
import { useNavigate } from 'react-router';

const InsuranceDetails = ({ handleDeleteInsurance }) => {
  const navigate = useNavigate();
  const { insurancePolicyId } = useParams();
  const insurance = insuranceData.find((ins) => ins._id === insurancePolicyId);

  const handleDelete = () => {
    handleDeleteInsurance(insurancePolicyId);
    navigate("/insurance");
  };

  return (
    <div>
      <h2>{insurance?.policyNo} - {insurance?.category}</h2>
      <p>Policy Number: {insurance?.policyNo}</p>
      <p>Category: {insurance?.category}</p>
      <p>Subscription Price: ${insurance?.subscriptionPrice}</p>
      <p>Issued on: {new Date(insurance?.dateIssued).toLocaleDateString()}</p>
      <p>Expires on: {new Date(insurance?.dateExpiry).toLocaleDateString()}</p>
      <button onClick={handleDelete}>Delete Insurance</button>
    </div>
  );
};

export default InsuranceDetails;
