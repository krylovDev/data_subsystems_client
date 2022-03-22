import { BASE_API_URL, METHOD_POST } from "./constants";

class Api {
	
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
	}
	
	_checkResponse(res) {
		if (res.ok){
			return res.json();}
		return Promise.reject('Произошла ошибка')
	}
	
	_getHeaders() {
		return {
			...this._headers
		}
	}
	
	addCreditCard(data){
		return fetch(`${this._url}`,{
			method:METHOD_POST,
			headers:this._getHeaders(),
			body:JSON.stringify(data)
		})
			.then(this._checkResponse)
	}
	
}

const api = new Api({
	url: BASE_API_URL,
	headers: {
		"content-type": "application/json"
	}
});

export default api
