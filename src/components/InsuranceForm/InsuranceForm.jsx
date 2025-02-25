import { useEffect, useState, useContext } from "react";
import { UserContext } from '../../contexts/UserContext';
import { useParams, Link } from "react-router";
import * as insuranceService from "../../services/InsuranceService";
import style from "./InsuranceForm.module.css";

const InsuranceForm = (props) => {
  const { user } = useContext(UserContext);
  const { insurancePolicyId } = useParams();
  const [formData, setFormData] = useState({
    category: "",
    policyNo: "",
    icon: "",
    dateIssued: "",
    dateExpiry: "",
    companyId: "",
    userId: user._id,
    subscriptionPrice: "",
  });

  useEffect(() => {
    const fetchInsurance = async () => {
      const insuranceData = await insuranceService.showInsurance(insurancePolicyId);
      // const dateExpiry = Date(insuranceData.dateExpiry)
      // const dateIssued = Date(insuranceData.dateIssued)
      // const format = "yyyy-MM-dd";
      // const local = "en-US";
      // insuranceData.dateIssued = formatDate(dateIssued, format, local)
      // insuranceData.dateExpiry = formatDate(dateExpiry, format, local)


      // console.log(insuranceData);
      
      setFormData(insuranceData);
    };
    if (insurancePolicyId) fetchInsurance();
    return () => {
      setFormData({
        category: "",
        policyNo: "",
        icon: "",
        dateIssued: "",
        dateExpiry: "",
        companyId: "",
        userId: user._id,
        subscriptionPrice: "",
      });
    };
  }, [insurancePolicyId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (insurancePolicyId) {
      props.handleUpdateInsurance(insurancePolicyId, formData);
    } else {
      props.handleAddInsurance(formData);
    }
  };

  // const isFormInvalid = () => {
  //   return !(formData.category && formData.policyNo && formData.icon && formData.dateIssued && formData.dateExpiry && formData.companyId  && formData.userId && formData.subscriptionPrice);
  // };

  return (
            <div className={style.container}>
           <div className={style.formBK}>
    <main>
      <h1>{insurancePolicyId ? 'Edit Insurance' : 'Add New Insurance'}</h1>
      <form onSubmit={handleSubmit} className={style.formAlign}>
        <div className={style.formGroup}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="health">Health</option>
            <option value="life">Life</option>
            <option value="car">Car</option>
            <option value="travel">Travel</option>
            <option value="home">Home</option>
          </select>
        </div>
        <div className={style.formGroup}>
          <label htmlFor="policyNo">Policy Number:</label>
          <input
            type="number"
            id="policyNo"
            name="policyNo"
            value={formData.policyNo}
            onChange={handleChange}
            disabled={insurancePolicyId ? true : false} // Make policyNo immutable if editing
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="icon">Icon:</label>
          <input
            type="text"
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="dateIssued">Date Issued:</label>
          <input
            type="date"
            id="dateIssued"
            name="dateIssued"
            value={formData.dateIssued}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="dateExpiry">Date Expiry:</label>
          <input
            type="date"
            id="dateExpiry"
            name="dateExpiry"
            value={formData.dateExpiry}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="companyId">Company ID:</label>
          <select
            id="companyId"
            name="companyId"
            value={formData.companyId}
            onChange={handleChange}
          >
            {props.company.map((comp) =>(

              <option key={comp._id} value={comp._id}>{comp.name}</option>

            ))}
          </select>
        </div>
        <div className={style.formGroup}>
          <label htmlFor="subscriptionPrice">Subscription Price:</label>
          <input
            type="number"
            id="subscriptionPrice"
            name="subscriptionPrice"
            value={formData.subscriptionPrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" >
          {/* disabled={isFormInvalid()} */}
            {insurancePolicyId ? "Update Insurance Policy" : "Create Insurance Policy"}
          </button>
          <button>
              <Link to={insurancePolicyId ? `/insurance/${insurancePolicyId}`: `/insurance`}>
               Back
              </Link>
            </button>
        </div>
      </form>
    </main>
  </div>
</div>
  );
};

export default InsuranceForm;
