

import axios from 'axios';

const fetchUser = async () => {
return new Promise((resolve, reject) => {
   axios
   .get(`https://dummyjson.com/products`)
   .then((response) => {
       resolve(response.data);
   })
   .catch((error) => {
       reject(error);
   });
});
};

export {fetchUser};