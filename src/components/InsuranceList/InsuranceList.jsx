import { Link } from "react-router";

const InsuranceList = (props) => {
  return (
    <main>

      {props.insurance.map((ins) => (
        <Link key={ins._id} to={`/insurance/${ins._id}`}>
          <article>
            <h1>
              {ins.policyNo} - {ins.category}
            </h1>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default InsuranceList;
