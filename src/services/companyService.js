const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/company`;


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
const show = async (companyId) => {
    try{
        const res = await fetch(`${BASE_URL}/${companyId}`, {
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

const deleteCompany = async (companyId) => {
  try {
    const res = await fetch(`${BASE_URL}/${companyId}`, {
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

const updateCompany = async (companyId, companyFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${companyId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(companyFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
    export {
        index,
        show,
        deleteCompany,
        updateCompany,
      };