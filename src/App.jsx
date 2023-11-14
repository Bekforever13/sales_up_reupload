import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Auth from './screens/Auth/Auth'
import { RoutesData } from './utils/routes.data'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				{RoutesData.map(item => (
					<Route key={item.path} path={item.path} element={<item.element />} />
				))}
			</Route>
			<Route path={'/auth'} element={<Auth />} />
		</Routes>
	)
}

export default App
