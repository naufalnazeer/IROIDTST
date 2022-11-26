

import axios from 'axios';

const fetchUser = async () => {
return new Promise((resolve, reject) => {
   axios
   .get(`http://proteinium.iroidtechnologies.in/api/v1/get-mealcategories`)
   .then((response) => {
       resolve(response);
   })
   .catch((error) => {
       reject(error);
   });
});
};

export {fetchUser};