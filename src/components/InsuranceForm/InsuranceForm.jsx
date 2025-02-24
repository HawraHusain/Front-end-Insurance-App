import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as insuranceService from "../../services/insuranceService";

const InsuranceForm = (props) => {
  const { insurancePolicyId } = useParams();
  const [formData, setFormData] = useState({
    category: "",
    policyNo: "",
    icon: "",
    dateIssued: "",
    dateExpiry: "",
    companyId: "",
    subscriptionPrice: "",
  });

  useEffect(() => {
    const fetchInsurance = async () => {
      const insuranceData = await insuranceService.showInsurance(insurancePolicyId);
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

  const isFormInvalid = () => {
    return !(formData.category && formData.policyNo && formData.icon && formData.dateIssued && formData.dateExpiry && formData.companyId && formData.subscriptionPrice);
  };

  return (
    <main>
      <h1>{insurancePolicyId ? 'Edit Insurance Policy' : 'New Insurance Policy'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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
        <div>
          <label htmlFor="icon">Icon:</label>
          <input
            type="text"
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dateIssued">Date Issued:</label>
          <input
            type="date"
            id="dateIssued"
            name="dateIssued"
            value={formData.dateIssued}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dateExpiry">Date Expiry:</label>
          <input
            type="date"
            id="dateExpiry"
            name="dateExpiry"
            value={formData.dateExpiry}
            onChange={handleChange}
          />
        </div>
        <div>
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
        <div>
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
          <button type="submit" disabled={isFormInvalid()}>
            {insurancePolicyId ? "Update Insurance Policy" : "Create Insurance Policy"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default InsuranceForm;
