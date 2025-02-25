import { Link } from 'react-router';
import style from './CompanyList.module.css';
const CompanyList = (props) => {

    return (

        <main>
            <h1>Companies</h1>
            <div className={style.container}>
                {props.company.map((company) => (
                    <button className={style.formBK}>

                        <Link key={company._id} to={`/company/${company._id}`}>
                            <article>
                                <h2>{company.name}</h2>
                            </article>
                        </Link>
                    </button>
                ))}
            </div>
        </main>

    );
};
export default CompanyList;
