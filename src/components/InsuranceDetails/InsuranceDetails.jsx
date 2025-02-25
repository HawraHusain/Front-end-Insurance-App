import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import * as InsuranceService from "../../services/InsuranceService";
import style from "./InsuranceDetails.module.css"
const InsuranceDetails = (props) => {
  const { insurancePolicyId } = useParams();
  const [insurance, setInsurance] = useState(null);

  useEffect(() => {
    const fetchInsurancePolicy = async () => {
      const insurancePolicyData = await InsuranceService.showInsurance(insurancePolicyId);
      setInsurance(insurancePolicyData);
    };
    fetchInsurancePolicy();
  }, [insurancePolicyId]);

  return (
    <main>
      {insurance ? (
        <>
        <h1>                   {insurance.policyNo} - {insurance.category}
        </h1>
          <div className={style.container}>
                       <div className={style.formBK}>
                    <img src={insurance.icon} className={style.imgCss}/>
                    <div className={style.formGroup}>
                    <h1 className={style.companyH1}>Policy Number: </h1>
                    <h2 className={style.companyH2}>{insurance.policyNo}</h2>
                    </div>
        
                    <div className={style.formGroup}>
                    <h1 className={style.companyH1}>Category:</h1>
                    <h2 className={style.companyH2}>{insurance.category}</h2>
                    </div>
        
                    <div className={style.formGroup}>
                    <h1 className={style.companyH1}>Subscription Price:</h1>
                    <h2 className={style.companyH2}>{insurance.subscriptionPrice}</h2>
                    </div>

                    <div className={style.formGroup}>
                    <h1 className={style.companyH1}>Issued on:</h1>
                    <h2 className={style.companyH2}>{new Date(insurance.dateIssued).toLocaleDateString()}</h2>
                    </div>

                    <div className={style.formGroup}>
                    <h1 className={style.companyH1}> Expires on:</h1>
                    <h2 className={style.companyH2}>{new Date(insurance.dateExpiry).toLocaleDateString()}</h2>
                    </div>
                    
                  </div>
                  <div>
                    
            <button>
              <Link to={`/insurance/${insurancePolicyId}/edit`}>
                Edit Policy
              </Link>
            </button>
            <button onClick={() => props.handleDeleteInsurance(insurancePolicyId)}>
              Delete
            </button>
          </div>
          </div>

        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default InsuranceDetails;
