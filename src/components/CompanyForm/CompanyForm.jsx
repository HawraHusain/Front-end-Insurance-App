import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as companyService from "../../services/companyService";

import style from "./CompanyForm.module.css";
const CompanyForm = (props) => {
  const { companyId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  useEffect(() => {
    const fetchCompany = async () => {
      const companyData = await companyService.show(companyId);
      setFormData(companyData);
    };
    if (companyId) fetchCompany();
    return () => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    };
  }, [companyId]);
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();  
    if (companyId) {
      props.handleUpdateCompany(companyId, formData); 
        } 
        else
    {  
    props.handleAddCompany(formData);
    }
  };
  const isFormInvalid = () => {
    return !(formData.name && formData.email && formData.phone && formData.address);
  };
  
  return(
        <div className={style.container}>
       <div className={style.formBK}>
    <main>
      <h1>{companyId?'Edit Company':'New Company'}</h1>
      <form onSubmit={handleSubmit} className={style.formAlign}>
        <div className={style.formGroup}>
          <label htmlFor="name">Company Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Company Name"
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone"
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Address"
          />
        </div>
        <div>
        <button type="submit" disabled={isFormInvalid()}>
            {companyId ? "Update Company" : "Create Company"}
          </button>        </div>
        </form>
    </main>
    </div>
    </div>
  );
  };
  export default CompanyForm;