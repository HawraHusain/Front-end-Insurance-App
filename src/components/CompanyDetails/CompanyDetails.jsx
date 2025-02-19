import { useParams, Link } from "react-router";
import { useEffect, useState, useContext } from "react";
import * as companyService from "../../services/companyService";
import { UserContext } from "../../contexts/UserContext";

const CompanyDetails = (props) => {
  const [company, setCompany] = useState(null);
  const { companyId } = useParams();
  const { user } = useContext(UserContext);
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
            <button><Link to={`/company/${companyId}`}>Edit</Link></button>
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
