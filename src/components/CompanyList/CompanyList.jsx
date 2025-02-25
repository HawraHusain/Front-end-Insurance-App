import { Link } from 'react-router';
import style from './CompanyList.module.css';
const CompanyList =(props) =>{

    return(
   
     <main>
        {props.company.map((company) => (
             <div className={style.container}>
   <div className={style.formBK}>
           <Link key={company._id} to={`/company/${company._id}`}>
            <article>
                <h2>{company.name}</h2>
            </article>
              </Link>
              </div>
    </div>
          ))}
    </main>
  
);
};
export default CompanyList;
