import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import Layout, { Content } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axiosBasic from '../../services/axios/axiosBasic'
import './Layout.scss'

const Layouts = () => {
	const navigate = useNavigate()
	const [collapsed, setCollapsed] = useState(false)
	const [langOpen, setLangOpen] = useState(false)
	const [selectedLang, setSelectedLang] = useState(0)
	const langList = ['ru', 'en']
	const langName = langList[selectedLang]
	const [currentUser, setCurrentUser] = useState('')
	const token = useState(localStorage.getItem('token'))

	// check token
	useEffect(() => {
		axiosBasic
			.post('/auth/check', token)
			.then(res => setCurrentUser(res.data.data.name))
	}, [token])

	// onclick language
	const onClickListItem = i => {
		localStorage.setItem('lang', langName)
		setSelectedLang(i)
		setLangOpen(false)
	}

	// func for aside ANTD start
	function getItem(label, key, icon, children) {
		return {
			key,
			children,
			icon,
			label,
		}
	}
	function logout() {
		axiosBasic
			.post('auth/logout', token)
			.then(() => {
				navigate('/auth', { replace: true })
				localStorage.removeItem('token')
			})
			.catch(() => navigate('/auth', { replace: true }))
	}
	const items = [
		getItem(<Link to={'/'}>Главная</Link>, '1', <i className='bx bx-home'></i>),
		getItem(
			<Link to={'/leads'}>Лиды</Link>,
			'2',
			<i className='bx bxs-contact'></i>
		),
		getItem(
			<Link to={'/orders'}>Заказы</Link>,
			'3',
			<i className='bx-cart-add bx'></i>
		),
		getItem(
			<Link to={'/courses'}>Курсы</Link>,
			'4',
			<i className='bx bx-notepad'></i>
		),
		getItem(
			<Link to={'/source'}>Источники</Link>,
			'5',
			<i className='bx bx-radio-circle-marked'></i>
		),
		getItem(
			<Link to={'/tools'}>Инструменты</Link>,
			'6',
			<i className='bx bx-wrench'></i>
		),
		getItem(
			<Link to={'/settings'}>Настройки</Link>,
			'7',
			<i className='bx bx-slider'></i>
		),
		getItem(
			<button onClick={logout}>Logout</button>,
			'8',
			<i className='bx bx-log-out'></i>
		),
	]
	// func for aside ANTD end

	return (
		<div className='layout__wrapper'>
			<aside className='layout__wrapper__aside sticky top-0 h-screen overflow-y-auto'>
				<Layout
					className='layout__wrapper__aside__lay-out'
					style={{ minHeight: '100vh' }}
				>
					<Sider
						className='sider'
						collapsible={null}
						theme='light'
						collapsed={collapsed}
					>
						{collapsed ? null : (
							<div className='layout__wrapper__header__logo absolute w-full'>
								Sales Up
							</div>
						)}
						<Menu
							className='mt-14'
							defaultSelectedKeys={'1'}
							mode='inline'
							items={items}
						/>
					</Sider>
				</Layout>
			</aside>
			<Layout>
				<header className='layout__wrapper__header'>
					<div className='flex items-center gap-4'>
						<button
							className='text-2xl text-white'
							onClick={() => setCollapsed(!collapsed)}
						>
							<i className='bx bx-menu'></i>
						</button>
						<h2 className='text-2xl ml-5'>{currentUser}</h2>
					</div>
					<div className='layout__wrapper__header__lang'>
						<span className='popup-btn' onClick={() => setLangOpen(!langOpen)}>
							{langName}
						</span>
						<svg
							width='10'
							height='6'
							viewBox='0 0 10 6'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
								fill='#2C2C2C'
							/>
						</svg>
						{langOpen && (
							<div className='lang__popup'>
								<ul>
									<li
										onClick={() => onClickListItem(0)}
										className={selectedLang === 0 ? 'active' : ''}
									>
										ru
									</li>
									<li
										onClick={() => onClickListItem(1)}
										className={selectedLang === 1 ? 'active' : ''}
									>
										en
									</li>
								</ul>
							</div>
						)}
					</div>
				</header>
				<Content>
					<Outlet />
				</Content>
			</Layout>
		</div>
	)
}

export default Layouts
