import { Navigate, useRoutes } from "react-router-dom"
import { Home } from "../Page/Home"
import { Projects } from "../Page/Projects"
import { In3 } from "../Page/Projects/In3"
import { ThreeDCharacter } from "../Page/Projects/ThreeDCharacter"

const NotFound = () => <h1>404</h1>
const routes = [
    // 重定向
    {
        path: '/',
        element: <Navigate to="/home" replace />,
        index: true, // 表示这是默认路径
    },
    // 主页 Home
    {
        path: '/home',
        element: <Home />,
    },
    // 项目 Projects
    {
        path: '/projects',
        element: <Projects />,
        children: [
            {
                path: 'in3',
                element: <In3 />
            },
            {
                path: 'threedcharacter',
                element: <ThreeDCharacter />
            },
        ]
    },

    // 未定义的路由
    {
        path: '*',
        element: <NotFound />
    }
]
function WraperRoutes() {
    let element = useRoutes(routes) // 识别当前的url， 返回对应的组件
    return element
}
export default WraperRoutes
