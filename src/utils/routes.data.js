import Courses from '../screens/Courses/Courses'
import Home from '../screens/Home/Home'
import Leads from '../screens/Leads/Leads'
import NotFound from '../screens/NotFound/NotFound'
import Orders from '../screens/Orders/Orders'
import Settings from '../screens/Settings/Settings'
import Source from '../screens/Source/Source'
import Tools from '../screens/Tools/Tools'

export const RoutesData = [
	{ path: '/', element: Home },
	{ path: '/courses', element: Courses },
	{ path: '/tools', element: Tools },
	{ path: '/leads', element: Leads },
	{ path: '/orders', element: Orders },
	{ path: '/settings', element: Settings },
	{ path: '/source', element: Source },
	{ path: '*', element: NotFound },
]
