import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import CompanyList from './components/CompanyList/CompanyList';
import CompanyDetails from './components/CompanyDetails/CompanyDetails';
import { UserContext } from './contexts/UserContext';
import * as companyService from './services/companyService';
import CompanyForm from './components/CompanyForm/CompanyForm';

const App = () => {
  const { user } = useContext(UserContext);
  const [company, setCompany] = useState([]);
  const navigate = useNavigate();


  const handleAddCompany = async (formData) => {
    try {
      const newCompany = await companyService.createCompany(formData);
      setCompany([newCompany, ...company]);
      navigate("/company");
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  const handleDeleteCompany = async (companyId) => {
    console.log("companyId", companyId);
    const deletedCompany = await companyService.deleteCompany(companyId);
    setCompany(company.filter((comp) => comp._id !== deletedCompany._id));
    navigate("/company");
  };

  const handleUpdateCompany = async (companyId , formData) => {
    try {
      const updatedCompany = await companyService.updateCompany(companyId,formData);
      setCompany(company.map((comp) => (comp._id === updatedCompany._id ? updatedCompany : comp)));
      navigate(`/company/${companyId}`);
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };


  useEffect(() => {
    const fetchAllCompanys = async () => {
      const companyData = await companyService.index();
      setCompany(companyData);
      // console log to verify
      console.log("companyData:", companyData);
    };
    if (user) fetchAllCompanys();
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path="/company/new" element={<CompanyForm handleAddCompany={handleAddCompany}/>} />

            <Route
              path="/company"
              element={<CompanyList company={company} />}
            />
            <Route
              path="/company/:companyId"
              element={
                <CompanyDetails handleDeleteCompany={handleDeleteCompany} />
              }
            />
            <Route path="/company/:companyId/edit" element={<CompanyForm handleUpdateCompany={handleUpdateCompany} />} />

          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
