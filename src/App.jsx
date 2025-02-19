import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import CompanyList from "./components/CompanyList/CompanyList";
import CompanyDetails from "./components/CompanyDetails/CompanyDetails";
import { UserContext } from "./contexts/UserContext";
import * as companyService from "./services/companyService";

const App = () => {
  const { user } = useContext(UserContext);
  const [company, setCompany] = useState([]);
  const navigate = useNavigate();

  const handleDeleteCompany = async (companyId) => {
    console.log("companyId", companyId);
    const deletedCompany = await companyService.deleteCompany(companyId);
    setCompany(company.filter((comp) => comp._id !== deletedCompany._id));
    navigate("/company");
  };

  useEffect(() => {
    const fetchAllCompanys = async () => {
      const companyData = await companyService.index();
      setCompany(companyData);
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
            <Route
              path='/company/:companyId'
              element={<CompanyForm />}
            />
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
