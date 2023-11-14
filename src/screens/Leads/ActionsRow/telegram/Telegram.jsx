import { Popover } from 'antd'
import React, { useState } from 'react'
import axiosBasic from '../../../../services/axios/axiosBasic'

const Telegram = user => {
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState({
		text: '',
		lead_id: user.user.id,
	})
	const send = () => {
		setOpen(false)
		setMessage('')
		axiosBasic.post('/messages', message)
	}

	const handleOpenChange = newOpen => {
		setOpen(newOpen)
	}

	const content = () => (
		<div className='flex flex-col gap-y-5'>
			<textarea
				value={message.text}
				onChange={e => setMessage({ ...message, text: e.target.value })}
				rows={4}
				type='text'
				className='border-[1px] border-black py-2 px-4 rounded-md min-h-[100px] resize-none'
			/>
			<a className='text-[#1677ff]' onClick={send}>
				Send
			</a>
		</div>
	)

	return (
		<Popover
			content={content}
			title='Send message'
			trigger='click'
			open={open}
			onOpenChange={handleOpenChange}
		>
			<button>
				<i className='bx bxl-telegram text-2xl'></i>
			</button>
		</Popover>
	)
}

export default Telegram
