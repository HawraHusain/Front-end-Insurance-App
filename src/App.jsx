import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import CompanyList from "./components/CompanyList/CompanyList";
import CompanyForm from "./components/CompanyForm/CompanyForm";
import * as companyService from "./services/companyService";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  const [company, setCompany] = useState([]);
  const navigate = useNavigate();

  //create

  const handleAddCompany = async (companyFormData) => {
    try {
      const newCompany = await companyService.companyCreate(companyFormData);
      setCompany([newCompany, ...company]);
      navigate("/company");
    } catch (error) {
      console.error("Error creating company:", error);
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
        <Route
          path="/company/new"
          element={<CompanyForm handleAddCompany={handleAddCompany} />}
        />

        
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route
              path="/company"
              element={<CompanyList company={company} />}
            />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
      </Routes>
    </>
  );
};

export default App;
