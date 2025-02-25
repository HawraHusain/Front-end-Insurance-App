import { Link } from "react-router";
import style from "./InsuranceList.module.css";
const InsuranceList = (props) => {
  return (
    <main>

      {props.insurance.map((ins) => (
         <div className={style.container}>
        <Link key={ins._id} to={`/insurance/${ins._id}`}>
                            <button className={style.formBK}>
        
          <article>
            <img src={ins.icon} alt="insurance img"/>
            <h1>
              {ins.policyNo} - {ins.category}
            </h1>
            <h2 className={style.dateH2}>Exp: {ins.dateExpiry.split('T')[0]}</h2>
            </article>
          </button>
        </Link>
        </div>
      ))}
    </main>
  );
};

export default InsuranceList;
