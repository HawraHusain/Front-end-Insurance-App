import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import CompanyList from './components/CompanyList/CompanyList';
import CompanyDetails from './components/CompanyDetails/CompanyDetails';
import { UserContext } from './contexts/UserContext';
import * as companyService from './services/companyService';
const App = () => {
  const { user } = useContext(UserContext);
  const [company,setCompany] = useState([]);

  useEffect(() => {
    const fetchAllCompanys = async () => {
      const companyData = await companyService.index();
            setCompany(companyData);
    };
    if (user) fetchAllCompanys();
  }, [user]);
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path='/company' element={<CompanyList  company={company}/>} />
            <Route path='/company/:companyId' element={<CompanyDetails />} />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );

};

export default App;
