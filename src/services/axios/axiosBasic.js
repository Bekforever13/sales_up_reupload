import axios from 'axios'

const axiosBasic = axios.create({
	baseURL: 'https://sales-up.uz/api',
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
})

export default axiosBasic
