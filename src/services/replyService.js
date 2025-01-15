

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/replies`;

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

const createReply = async (replyDetails) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(replyDetails),
            });
            return res.json();
          } catch (error) {
            console.log(error);
          }
};

const deleteReply = async (_id) => {
    try {
      // Make the API call to delete the reply
      const response = await fetch(`${BASE_URL}/drafts/${_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Corrected the Authorization header syntax
        },
      });
  
      // Check if the response was successful
      if (!response.ok) {
        throw new Error('Failed to delete reply');
      }
  
      // Parse the response as JSON
      const data = await response.json();
  
      // Return the data after deletion
      return data;
    } catch (err) {
      console.error('Error deleting reply:', err);
      throw err;  // Rethrow the error to be handled by the caller
    }
  };
  

  
export { index, createReply, deleteReply };