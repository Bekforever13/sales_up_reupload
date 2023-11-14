import React from 'react'
import './ActionsRow.scss'
import Comment from './comment/Comment'
import Telegram from './telegram/Telegram'

const ActionsRow = ({ user }) => {
	return (
		<div className='flex items-center gap-2'>
			<Comment user={user} />
			<Telegram user={user} />
		</div>
	)
}

export default ActionsRow
