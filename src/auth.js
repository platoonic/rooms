import API from './axios';

const login = (username, token, id) => {
	//Save User data in localStorage
	let userData = {
		id: id,
		username: username,
		token: token
	};
	localStorage.setItem('userData', JSON.stringify(userData));
	
	//Send Token with Each request
	return API.interceptors.request.use((config) => {
		config.headers.token = token;
		return config;
	}, (error) => {
		return Promise.reject(error);
	})
}

const logout = (interceptorID) => {
	localStorage.removeItem('userData');
	//Remove token from requests header
	API.interceptors.request.eject(interceptorID);
}

export {
	login,
	logout
}