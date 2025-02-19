const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/company`;


const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
    };

  //create  
const companycreate = async (companyFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
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
};

    export default {
        index,
  companycreate
      };