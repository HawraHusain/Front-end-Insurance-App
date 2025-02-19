import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 

import { UserContext } from '../../contexts/UserContext'; 

const createCompany = async (companyData) => {
  try {
    
    const response = await fetch('/api/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(companyData),
    });

    if (!response.ok) {
      throw new Error('Failed to create company');
    }

    return await response.json(); 
  } catch (err) {
    throw new Error(err.message);
  }
};

const CompanyForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); 
  
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const { name, email, phone, address } = formData;

  const handleChange = (evt) => {
    setMessage(''); 
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newCompany = await createCompany(formData);
      setUser(newCompany); 
      navigate('/'); 
    } catch (err) {
      setMessage(err.message); 
    }
  };

  const isFormInvalid = () => {
    return !(name && email && phone && address);
  };

  return (
    <main>
      <h1>Create Company</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Company Name:</label>
          <input
            type='text'
            id='name'
            value={name}
            name='name'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            name='email'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='phone'>Phone:</label>
          <input
            type='tel'
            id='phone'
            value={phone}
            name='phone'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='address'>Address:</label>
          <input
            type='text'
            id='address'
            value={address}
            name='address'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Create Company</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default CompanyForm;
