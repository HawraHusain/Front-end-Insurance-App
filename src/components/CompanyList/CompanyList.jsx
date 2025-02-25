import { Link } from "react-router";

const CompanyList = (props) => {    
  return (
    <main>
      {props.company.map((company) => (
        <Link key={company._id} to={`/company/${company._id}`}>
          <article>
            <h2>{company.name}</h2>
          </article>
        </Link>
      ))}
    </main>
  );
};
export default CompanyList;
