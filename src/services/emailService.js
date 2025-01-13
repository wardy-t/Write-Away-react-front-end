

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/emails`;

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

const create = async (emailDetails) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailDetails),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, create };