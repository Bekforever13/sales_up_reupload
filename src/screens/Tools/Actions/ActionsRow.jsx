import { notification } from 'antd'
import React from 'react'
import './ActionsRow.scss'

const ActionsRow = ({ user }) => {
	const config = {
		placement: 'topRight',
		top: 50,
		duration: 2,
		rtl: true,
		message: 'Copied to clipboard!',
	}
	const onCopy = () => {
		navigator.clipboard.writeText(user.url)
		notification.success(config)
	}
	return (
		<div className='flex items-center gap-2' onClick={onCopy}>
			<i className='bx bx-copy text-3xl text-[#8e8989] cursor-pointer'></i>
		</div>
	)
}

export default ActionsRow
