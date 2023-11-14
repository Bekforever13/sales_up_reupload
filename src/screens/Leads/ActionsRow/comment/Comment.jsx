import { Popover } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axiosBasic from '../../../../services/axios/axiosBasic.js'
import { usersModel } from '../../../../store/usersModel'

const Comment = user => {
	const [open, setOpen] = useState(false)
	const dispatch = useDispatch()
	const [comment, setComment] = useState({
		...user.user,
		comment: '',
	})

	const send = () => {
		setOpen(false)
		axiosBasic.put(`/leads/${user.user.id}`, comment)
		dispatch(usersModel.actions.addComment(comment))
	}

	const handleOpenChange = open => {
		setOpen(open)
	}

	const content = () => (
		<div className='flex flex-col gap-y-5'>
			<textarea
				maxLength={200}
				value={comment.comment}
				onChange={e => setComment({ ...comment, comment: e.target.value })}
				rows={4}
				type='text'
				className='border-[1px] border-black py-2 px-4 rounded-md min-h-[100px] resize-none'
			/>
			<button className='text-[#1677ff]' onClick={send}>
				Send
			</button>
		</div>
	)

	return (
		<Popover
			content={content}
			title='Comment'
			trigger='click'
			open={open}
			onOpenChange={handleOpenChange}
		>
			<button>
				<i className='bx bx-comment text-2xl'></i>
			</button>
		</Popover>
	)
}

export default Comment
