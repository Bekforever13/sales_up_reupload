// Исправленный код
import React, { useEffect, useState } from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import axiosBasic from '../../../services/axios/axiosBasic'
import { chartsModel } from '../../../store/chartsModel'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const CoursesChart = () => {
	const [counts, setCounts] = useState([])
	const dispatch = useDispatch()
	const chartDatas = useSelector(state => state.charts.statuses)

	useEffect(() => {
		axiosBasic.get('/courses').then(res => {
			res.data.data.forEach(item => {
				setCounts(prev => [...prev, item.leads_count])
			})
			dispatch(chartsModel.actions.fetchCourses(res.data.data))
		})
	}, [])

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			},
		},
	}

	const data = {
		labels: ['Английский язык', 'Математика', 'Русский язык', 'Физика'],
		datasets: [
			{
				label: 'Количество',
				data: [counts[0], counts[1], counts[2], counts[3]],
				backgroundColor: ['Red', 'Green', 'Blue', 'Cyan'],
			},
		],
	}

	return (
		<>
			<h2>Курсы</h2>
			<Bar options={options} data={data} />
		</>
	)
}

export default CoursesChart
