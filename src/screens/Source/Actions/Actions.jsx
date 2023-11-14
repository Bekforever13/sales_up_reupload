import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button } from '@mui/material'
import { Popconfirm, Popover, Select } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axiosBasic from '../../../services/axios/axiosBasic'
import { sourceModel } from '../../../store/sourceModel'

const Actions = ({ source }) => {
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	const options = [
		{
			value: 'Telegram Bot',
			label: 'Telegram Bot',
		},
		{
			value: 'Web',
			label: 'Web',
		},
	]
	const [newDataSource, setNewDataSource] = useState({
		name: source.name,
		type: source.type,
	})
	const handleOpenChange = newOpen => {
		setOpen(newOpen)
	}

	const removeSource = () => {
		dispatch(sourceModel.actions.removeSource(source.id))
		axiosBasic.delete(`/sources/${source.id}`)
	}

	const onSelect = e => setNewDataSource({ ...newDataSource, type: e })

	const onSubmit = () => {
		const obj = { id: source.id, ...newDataSource }
		axiosBasic.put(`/sources/${source.id}`, obj)
		dispatch(
			sourceModel.actions.editSource({
				...source,
				name: newDataSource.name,
				type: newDataSource.type,
			})
		)
	}

	const content = () => (
		<div className='w-[200px] flex flex-col gap-y-5'>
			<input
				className='w-full border-[1px] border-black py-2 px-4 rounded-md'
				placeholder='Название...'
				value={newDataSource.name}
				onChange={e =>
					setNewDataSource({ ...newDataSource, name: e.target.value })
				}
				type='text'
			/>
			<Select
				className='w-full rounded-md'
				placeholder='Выберите'
				optionFilterProp='children'
				filterOption={(input, option) =>
					(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
				}
				defaultValue={source.type}
				onChange={onSelect}
				options={options}
			/>
			<Button onClick={onSubmit} variant='contained'>
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
					onConfirm={removeSource}
					title='Удаление'
					icon={
						<QuestionCircleOutlined
							style={{
								color: 'red',
							}}
						/>
					}
					description='Вы хотите удалить источник?'
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

export default Actions
