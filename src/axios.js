const axios = require('axios');

const instance = axios.create({
	baseURL: 'https://room-backend-networks.herokuapp.com/'
});

export default instance;