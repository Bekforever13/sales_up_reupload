import { Button, TextField } from '@mui/material'
import { Select } from 'antd'
import { DatePicker } from 'antd/lib'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axiosBasic from '../../../services/axios/axiosBasic'
const { RangePicker } = DatePicker

const Filter = ({
	leadId,
	setLeadId,
	courseId,
	setCourseId,
	setDateFrom,
	setDateTo,
}) => {
	const dispatch = useDispatch()

	// date picker
	const onRangeChange = (dates, dateStrings) => {
		if (dates) {
			setDateFrom(dateStrings[0])
			setDateTo(dateStrings[1])
			console.log('From: ', dates[0], ', to: ', dates[1])
			console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
		} else {
			console.log('Clear')
		}
	}
	const rangePresets = [
		{
			label: 'Last 7 Days',
			value: [dayjs().add(-7, 'd'), dayjs()],
		},
		{
			label: 'Last 14 Days',
			value: [dayjs().add(-14, 'd'), dayjs()],
		},
		{
			label: 'Last 30 Days',
			value: [dayjs().add(-30, 'd'), dayjs()],
		},
		{
			label: 'Last 90 Days',
			value: [dayjs().add(-90, 'd'), dayjs()],
		},
	]

	const clearValues = () => {
		setLeadId('')
		setCourseId('')
	}
	const [options, setOptions] = useState([])

	useEffect(() => {
		axiosBasic
			.get('/courses')
			.then(res => {
				res.data.data.map(item => {
					setOptions(prev => [...prev, { label: item.title, value: item.id }])
				})
			})
	}, [])

	const onSelectCourse = e => setCourseId(e)

	return (
		<>
			<div className='leads__wrapper p-5'>
				<div className='search flex items-center gap-5 mb-2'>
					<label>
						<Select
							className='w-full rounded-md'
							placeholder='Выберите'
							optionFilterProp='children'
							filterOption={(input, option) =>
								(option?.label ?? '')
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							onChange={onSelectCourse}
							options={options}
						/>
					</label>
					<label>
						<TextField
							value={leadId}
							onChange={e => setLeadId(e.target.value)}
							id='outlined-basic'
							label='Lead id'
							variant='outlined'
						/>
					</label>
					<label>
						<RangePicker
							className='px-4 py-4'
							presets={rangePresets}
							onChange={onRangeChange}
						/>
					</label>
					<div>
						<Button type={'text'} onClick={clearValues}>
							Clear
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Filter
