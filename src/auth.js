import API from './axios';

const login = (username, token) => {
	//Save User data in localStorage
	let userData = {
		username: username,
		token: token
	};
	localStorage.setItem('userData', JSON.stringify(userData));
	
	//Send Token with Each request
	API.interceptors.request.use((config) => {
		config.headers.token = token;
		return config;
	}, (error) => {
		return Promise.reject(error);
	})
}

const logout = () => {
	localStorage.removeItem('userData');
	//Remove token from requests header
	API.interceptors.request.use((config) => {
		config.headers.token = '';
	}, (error) => {
		return Promise.reject(error);
	});
}

export {
	login,
	logout
}