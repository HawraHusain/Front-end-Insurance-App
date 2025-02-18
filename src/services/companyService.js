const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/company`;


const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    const data = await res.json();

    console.log(data);

    if (data.err) {
      throw new Error(data.err);
    }
    console.log(data);
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
      
          console.log(data);
      
          if (data.err) {
            throw new Error(data.err);
          }
          console.log(data);
          return data
    }
    catch(err){
        console.log(err);
        throw new Error(err);
    }
}
    export {
        index,
        show,
      };