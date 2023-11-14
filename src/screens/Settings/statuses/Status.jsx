import { Button, Input, Space } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axiosBasic from '../../../services/axios/axiosBasic'
import Edit from './Edit'
import Remove from './Remove'

const Status = ({ setRenderStatus, renderStatus }) => {
	const [newStatus, setNewStatus] = useState({ name: '' })
	const statuses = useSelector(state => state.statuses.statuses)

	const createStatus = () => {
		axiosBasic.post('/statuses', newStatus).then(() => {
			setRenderStatus(renderStatus + 1)
			setNewStatus({ name: '' })
		})
	}

	return (
		<div className='flex-1 flex flex-col bg-white rounded-md shadow-md min-h-[200px] p-5'>
			<h2 className='text-2xl'>Статус</h2>
			<form className='flex flex-col gap-y-5'>
				<Space.Compact style={{ width: '100%' }}>
					<Input
						onChange={e => setNewStatus({ name: e.target.value })}
						value={newStatus.name}
						placeholder='Статус'
						className='py-2 text-lg'
					/>
					<Button
						onClick={createStatus}
						type='primary'
						className='bg-[#1976D2] py-2 text-lg h-fit'
					>
						Submit
					</Button>
				</Space.Compact>
				<ul className='flex flex-col gap-y-3'>
					{statuses &&
						statuses.map(status => (
							<li
								key={status.id}
								className='flex items-center justify-between border-[1px] border-[#adadad] py-3 px-2 rounded-md text-lg'
							>
								<span>{status.name}</span>
								{status.name === 'started' ||
								status.name === 'registred' ||
								status.name === 'ordered' ||
								status.name === 'called' ? null : (
									<div className='flex items-center text-2xl gap-x-5 text-[#797575]'>
										<Edit
											item={status}
											renderStatus={renderStatus}
											setRenderStatus={setRenderStatus}
										/>
										<Remove
											renderStatus={renderStatus}
											setRenderStatus={setRenderStatus}
											item={status}
										/>
									</div>
								)}
							</li>
						))}
				</ul>
			</form>
		</div>
	)
}

export default Status
