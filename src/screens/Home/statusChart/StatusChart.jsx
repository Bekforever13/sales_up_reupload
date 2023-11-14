import React, { useEffect, useState } from 'react'
import { chartsModel } from '../../../store/chartsModel'
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
import { Select } from 'antd'
import '../Home.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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

const StatusChart = () => {
	const dispatch = useDispatch()
	const { statuses, courses } = useSelector(state => state.charts)
	const [selectOptions, setSelectOptions] = useState([
		{ value: 0, label: 'All' },
	])
	const [sources, setSources] = useState({
		sources: [],
	})

	const handleSelect = e => setSources({ sources: e })

	useEffect(() => {
		axiosBasic.get('/sources').then(res => {
			res.data.data.map(item => {
				setSelectOptions(prev => [
					...prev,
					{ value: item.id, label: item.name },
				])
			})
		})
	}, [])

	useEffect(() => {
		axiosBasic.get('/status-leads', { params: sources }).then(res => {
			dispatch(chartsModel.actions.fetchStatuses(res.data.data))
		})
	}, [sources.sources.length])

	const data = {
		labels: ['Started', 'Called', 'Registered', 'Ordered'],
		datasets: [
			{
				label: 'Количество',
				data: [
					statuses.leads_status_started,
					statuses.leads_status_called,
					statuses.leads_status_registered,
					statuses.leads_status_ordered,
				],
				backgroundColor: ['Pink', 'Purple', 'Yellow', 'Orange'],
			},
		],
	}

	return (
		<>
			<div className='heading'>
				<h2>Статусы</h2>
				<Select
					mode='multiple'
					style={{ minWidth: '150px', transform: 'translateY(-10px)' }}
					options={selectOptions}
					onChange={e => handleSelect(e)}
					defaultValue={0}
				/>
			</div>
			<Bar options={options} data={data} />
		</>
	)
}

export default StatusChart
