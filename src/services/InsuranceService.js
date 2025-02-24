const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/insurance`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const createInsurance = async (formData) => {
    try {
      const res = await fetch(`${BASE_URL}/new`,{
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const showInsurance = async (insurancePolicyId) => {
      try{
          const res = await fetch(`${BASE_URL}/${insurancePolicyId}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await res.json();
            if (data.err) {
              throw new Error(data.err);
            }
            return data
      }
      catch(err){
          console.log(err);
          throw new Error(err);
      }
  }
  const deleteInsurance = async (insurancePolicyId) => {
    try {
      const res = await fetch(`${BASE_URL}/${insurancePolicyId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  const updateInsurance = async (insurancePolicyId, formData) => {
    try {
      const res = await fetch(`${BASE_URL}/${insurancePolicyId}/edit`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }
export {
  index,
  createInsurance,
  showInsurance,
  deleteInsurance,
  updateInsurance
};

