

import axios from 'axios';

const fetchUser = async () => {
return new Promise((resolve, reject) => {
   axios
   .get(`https://fakerapi.it/api/v1/addresses?_quantity=1`)
   .then((response) => {
       resolve(response);
   })
   .catch((error) => {
       reject(error);
   });
});
};

export {fetchUser};