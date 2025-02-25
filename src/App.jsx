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
import * as InsuranceService from './services/InsuranceService';
import InsuranceForm from "./components/InsuranceForm/InsuranceForm";
import InsuranceList from "./components/InsuranceList/InsuranceList";
import InsuranceDetails from "./components/InsuranceDetails/InsuranceDetails";
const App = () => {
  const { user } = useContext(UserContext);
  const [company, setCompany] = useState([]);
  const [insurance, setInsurance] = useState([]);

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

  const handleAddInsurance = async (formData) => {
    try {
      const newInsurance = await InsuranceService.createInsurance(formData); 
      setInsurance([newInsurance, ...insurance]);
      navigate("/insurance");
    } catch (error) {
      console.error("Error creating insurance:", error);
    }
  };

  const handleDeleteInsurance = async (insurancePolicyId) => {
    try {
      const deletedInsurance = await InsuranceService.deleteInsurance(insurancePolicyId);
      setInsurance(insurance.filter((ins) => ins._id !== deletedInsurance._id));
      navigate("/insurance");
    } catch (error) {
      console.error("Error deleting insurance:", error);
    }
  };

  const handleUpdateInsurance = async (insurancePolicyId, formData) => {    
    try {
      const updatedInsurance = await InsuranceService.updateInsurance(insurancePolicyId, formData);
      setInsurance(insurance.map((ins) => (ins._id === updatedInsurance._id ? updatedInsurance : ins)));
      navigate(`/insurance/${insurancePolicyId}`);
    } catch (error) {
      console.error("Error updating insurance:", error);
    }
  };

  useEffect(() => {
    const fetchAllCompanys = async () => {
      const companyData = await companyService.index();
      setCompany(companyData);
    };
    const fetchAllInsurances = async () => { 
      const insuranceData = await companyService.index();     
      setInsurance(insuranceData);
    };
    if (user){ fetchAllCompanys(); fetchAllInsurances(); }
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path="/company/new" element={<CompanyForm handleAddCompany={handleAddCompany}/>} />
            <Route path="/company" element={<CompanyList company={company} />}/>
            <Route path="/company/:companyId" element={ <CompanyDetails handleDeleteCompany={handleDeleteCompany} />}/>
            <Route path="/company/:companyId/edit" element={<CompanyForm handleUpdateCompany={handleUpdateCompany} />}/>
            <Route path="/insurance/new" element={<InsuranceForm handleAddInsurance={handleAddInsurance} company={company}/>} />
            <Route path="/insurance" element={<InsuranceList insurance={insurance} />} />
            <Route path="/insurance/:insurancePolicyId" element={<InsuranceDetails handleDeleteInsurance={handleDeleteInsurance}  insurance={insurance}/>} />
            <Route path="/insurance/:insurancePolicyId/edit" element={<InsuranceForm handleUpdateInsurance={handleUpdateInsurance} company={company}/>} />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
