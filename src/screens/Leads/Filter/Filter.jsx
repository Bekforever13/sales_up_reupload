import { Button, IconButton, TextField } from '@mui/material'
import { Form, Popover } from 'antd'
import { DatePicker } from 'antd/lib'
import moment from 'moment/moment'
import React, { useRef, useState } from 'react'
import axiosBasic from '../../../services/axios/axiosBasic'
const { RangePicker } = DatePicker

const Filter = ({
	name,
	setName,
	phone,
	setPhone,
	setDateFrom,
	setDateTo,
	dateFrom,
	dateTo,
}) => {
	const [messageToAll, setMessageToAll] = useState({ text: '' })
	const [open, setOpen] = useState(false)
	const date = useRef(null)
	const [dates, setDates] = useState([])

	const send = () => {
		setOpen(false)
		console.log(messageToAll)
		axiosBasic.post('/sendmsgall', messageToAll).then(res => console.log(res))
	}

	const handleOpenChange = newOpen => {
		setOpen(newOpen)
	}

	console.log(dayjs().format(null))

	const content = () => (
		<div className='flex flex-col gap-y-5'>
			<textarea
				value={messageToAll.text}
				onChange={e => setMessageToAll({ text: e.target.value })}
				rows={4}
				type='text'
				className='border-[1px] border-black py-2 px-4 rounded-md min-h-[100px] resize-none'
			/>
			<a className='text-[#1677ff]' onClick={send}>
				Send
			</a>
		</div>
	)

	// date picker
	const onRangeChange = (dates, dateStrings) => {
		if (dates) {
			setDateFrom(dateStrings[0])
			setDateTo(dateStrings[1])
			setDates([
				moment(dateStrings[0], 'YYYY-MM-DD'),
				moment(dateStrings[1], 'YYYY-MM-DD'),
			])
		} else {
			console.log('Clear')
		}
	}

	const clearValues = e => {
		e.preventDefault()
		setName('')
		setPhone('')
		setDateFrom('')
		setDateTo('')
		setDates([])
	}

	return (
		<>
			<div className='leads__wrapper p-5'>
				<Form className='search flex items-center gap-5 mb-2'>
					<label>
						<TextField
							value={name}
							onChange={e => setName(e.target.value)}
							id='outlined-basic'
							label='Name'
							variant='outlined'
						/>
					</label>
					<label>
						<TextField
							value={phone}
							onChange={e => setPhone(e.target.value)}
							id='outlined-basic'
							label='Phone'
							variant='outlined'
						/>
					</label>
					<label>
						<RangePicker
							value={dates}
							allowClear
							className='px-4 py-4'
							onChange={onRangeChange}
						/>
					</label>
					<div>
						<Button type={'text'} onClick={clearValues}>
							Clear
						</Button>
						<Popover
							content={content}
							title='Send message to all'
							trigger='click'
							open={open}
							onOpenChange={handleOpenChange}
						>
							<IconButton aria-label='delete'>
								<i className='bx bxl-telegram'></i>
							</IconButton>
						</Popover>
					</div>
				</Form>
			</div>
		</>
	)
}

export default Filter
