import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as companyService from "../../services/companyService";
const CompanyDetails = () => {
    const [company, setCompany] = useState(null);
    const {companyId} = useParams();
    console.log(companyId);
    useEffect(() => {
        const fetchCompany = async () => {
            const companyData = await companyService.show(companyId);
            setCompany(companyData);
        };
        fetchCompany();
    }, [companyId]);
    return <main>
        {company ? (
            <div>
                <h1>{company.name}</h1>
                <h1>{company.email}</h1>
                <h1>{company.phone}</h1>
                <h1>{company.address}</h1>

            </div>
        ) : (
            <p>Loading...</p>
        )}
    </main>;
};

export default CompanyDetails;