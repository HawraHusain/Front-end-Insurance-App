import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import * as companyService from "../../services/companyService";

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
          <div>
            <h1>{company.name}</h1>
            <h1>{company.email}</h1>
            <h1>{company.phone}</h1>
            <h1>{company.address}</h1>
          </div>
          <div>
            
        <button> <Link to={`/company/${companyId}/edit`}>Edit</Link></button> 
            <button onClick={() => props.handleDeleteCompany(companyId)}>
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

export default CompanyDetails;
