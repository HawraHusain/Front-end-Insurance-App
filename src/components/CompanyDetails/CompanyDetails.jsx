import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import * as companyService from "../../services/companyService";
import style from "./CompanyDetails.module.css";
const CompanyDetails = (props) => {
  const [company, setCompany] = useState(null);
  const { companyId } = useParams();
  useEffect(() => {
    const fetchCompany = async () => {
      const companyData = await companyService.show(companyId);
      setCompany(companyData);
    };
    fetchCompany();
  }, [companyId]);
  return (
    <main>
      {company ? (
        <>
                <div className={style.container}>
               <div className={style.formBK}>
            <div className={style.formGroup}>
            <h1 className={style.companyH1}>Company Name:</h1>
            <h2 className={style.companyH2}>{company.name}</h2>
            </div>

            <div className={style.formGroup}>
            <h1 className={style.companyH1}>Company Email:</h1>
            <h2 className={style.companyH2}>{company.email}</h2>
            </div>

            <div className={style.formGroup}>
            <h1 className={style.companyH1}>Company Phone Number:</h1>
            <h2 className={style.companyH2}>{company.phone}</h2>
            </div>

            <div className={style.formGroup}>
            <h1 className={style.companyH1}>Company Address:</h1>
            <h2 className={style.companyH2}>{company.address}</h2>
            </div>
          </div>
          <div>
            
        <button> <Link to={`/company/${companyId}/edit`}>Edit</Link></button> 
            <button onClick={() => props.handleDeleteCompany(companyId)}>
            <Link to={`/company`} > Delete</Link>
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

export default CompanyDetails;
