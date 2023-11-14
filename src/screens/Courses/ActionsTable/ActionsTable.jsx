import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button } from '@mui/material'
import { Popconfirm, Popover } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axiosBasic from '../../../services/axios/axiosBasic'
import { courseModel } from '../../../store/courseModel'

const ActionsTable = ({ course, setIsEdited, isEdited }) => {
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	const [newDataCourse, setNewDataСourse] = useState({
		title: '',
		description: '',
		price: '',
	})
	const handleOpenChange = newOpen => setOpen(newOpen)

	const removeCource = () => {
		dispatch(courseModel.actions.removeCource(course.id))
		axiosBasic.delete(`/courses/${course.id}`)
	}

	const onEditSubmit = () => {
		const obj = { id: course.id, ...newDataCourse }
		axiosBasic
			.put(`/courses/${course.id}`, obj)
			.then(res => setIsEdited(isEdited + 1))
		dispatch(
			courseModel.actions.editCource({
				...course,
				title: newDataCourse.title,
				price: newDataCourse.price,
				description: newDataCourse.description,
			})
		)
	}

	const content = () => (
		<div className='w-[200px] flex flex-col gap-y-5'>
			<input
				className='w-full border-[1px] border-black py-2 px-4 rounded-md'
				placeholder='Название...'
				value={newDataCourse.title}
				onChange={e =>
					setNewDataСourse({ ...newDataCourse, title: e.target.value })
				}
				type='text'
			/>
			<input
				className='w-full border-[1px] border-black py-2 px-4 rounded-md'
				placeholder='Цена...'
				value={newDataCourse.price}
				onChange={e =>
					setNewDataСourse({ ...newDataCourse, price: e.target.value })
				}
				type='text'
			/>
			<input
				className='w-full border-[1px] border-black py-2 px-4 rounded-md'
				placeholder='Описание...'
				value={newDataCourse.description}
				onChange={e =>
					setNewDataСourse({ ...newDataCourse, description: e.target.value })
				}
				type='text'
			/>
			<Button onClick={onEditSubmit} variant='contained'>
				Добавить
			</Button>
		</div>
	)

	return (
		<>
			<div className='flex items-center gap-x-3'>
				<Popover
					content={content}
					trigger='click'
					open={open}
					onOpenChange={handleOpenChange}
				>
					<button>
						<i className='bx bx-pencil text-2xl text-[#797575]'></i>
					</button>
				</Popover>
				<Popconfirm
					onConfirm={removeCource}
					title='Удаление'
					icon={
						<QuestionCircleOutlined
							style={{
								color: 'red',
							}}
						/>
					}
					description='Вы хотите удалить курс?'
					okButtonProps={{ style: { backgroundColor: 'blue' } }}
				>
					<button>
						<i className='bx bx-trash text-2xl text-[#797575]'></i>
					</button>
				</Popconfirm>
			</div>
		</>
	)
}

export default ActionsTable
