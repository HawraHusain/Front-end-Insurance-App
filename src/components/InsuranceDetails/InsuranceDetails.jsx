import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import * as InsuranceService from "../../services/InsuranceService";

const InsuranceDetails = (props) => {
  const { insurancePolicyId } = useParams();
  const [insurance, setInsurance] = useState(null);

  useEffect(() => {
    const fetchInsurancePolicy = async () => {
      const insurancePolicyData = await InsuranceService.showInsurance(insurancePolicyId);
      // const formattedDateIssued = insurancePolicyData.dateIssued.split('T')[0]
      // const formattedDateExpiry = insurancePolicyData.dateExpiry.split('T')[0]
      // insurancePolicyData.dateExpiry = formattedDateExpiry
      // insurancePolicyData.dateIssued = formattedDateIssued
      // console.log(insurancePolicyData.dateExpiry);
      setInsurance(insurancePolicyData);
    };
    fetchInsurancePolicy();
  }, [insurancePolicyId]);

  return (
    <main>
      {insurance ? (
        <>
          <div>
            <h2>
              {insurance.policyNo} - {insurance.category}
            </h2>
            <p>Policy Number: {insurance.policyNo}</p>
            <p>Category: {insurance.category}</p>
            <p>Subscription Price: ${insurance.subscriptionPrice}</p>
            <p>
              Issued on: {new Date(insurance.dateIssued).toLocaleDateString()}
            </p>
            <p>
              Expires on: {new Date(insurance.dateExpiry).toLocaleDateString()}
            </p>
            <button>
              <Link to={`/insurance/${insurancePolicyId}/edit`}>
                Edit Policy
              </Link>
            </button>
            <button onClick={() => props.handleDeleteInsurance(insurancePolicyId)}>
              Delete
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default InsuranceDetails;
