import axios from 'axios'

const axiosBasic = axios.create({
	baseURL: 'https://sales-up.uz/api',
})

axiosBasic.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export default axiosBasic
