import React from 'react'
import { useDispatch } from 'react-redux'
import axiosBasic from '../../../services/axios/axiosBasic'
import { statusesModel } from '../../../store/settingsModel/statuses'

const Remove = ({ item, renderStatus, setRenderStatus }) => {
	const dispatch = useDispatch()

	const removeStatus = e => {
		e.preventDefault()
		dispatch(statusesModel.actions.removeStatus(item.id))
		axiosBasic
			.delete(`/statuses/${item.id}`)
			.then(() => setRenderStatus(renderStatus - 1))
			.catch(er => console.log(er))
	}

	return (
		<button onClick={e => removeStatus(e)}>
			<i className='bx bx-trash'></i>
		</button>
	)
}

export default Remove
