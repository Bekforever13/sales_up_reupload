import { Button } from '@mui/material'
import { Popover } from 'antd'
import React, { useState } from 'react'
import axiosBasic from '../../../services/axios/axiosBasic'

const Edit = ({ item, setRenderStatus, renderStatus }) => {
	const [open, setOpen] = useState(false)
	const [newStatusName, setNewStatusName] = useState({ name: item.name })

	const handleOpenChange = newOpen => {
		setOpen(newOpen)
	}

	const onSubmit = () => {
		axiosBasic
			.put(`/statuses/${item.id}`, newStatusName)
			.then(() => setRenderStatus(renderStatus + 1))
		setOpen(false)
		setNewStatusName({ name: '' })
	}

	const content = () => (
		<div className='w-[200px] flex flex-col gap-y-5'>
			<input
				className='w-full border-[1px] border-black py-2 px-4 rounded-md'
				placeholder='Новое название статуса...'
				value={newStatusName.name}
				onChange={e => setNewStatusName({ name: e.target.value })}
				type='text'
			/>
			<Button onClick={onSubmit} variant='contained'>
				Добавить
			</Button>
		</div>
	)
	return (
		<Popover
			content={content}
			trigger='click'
			open={open}
			onOpenChange={handleOpenChange}
		>
			<span className='cursor-pointer'>
				<i className='bx bx-pencil text-2xl text-[#797575]'></i>
			</span>
		</Popover>
	)
}

export default Edit
