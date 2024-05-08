import { useRoutes } from "react-router-dom"
import { Home } from "../Page/Home"
import { Projects } from "../Page/Projects"

const NotFound = () => <h1>404</h1>
const routes = [
    {
        path: '/home',
        element: <Home />,
        // children: [
        //     {
        //         index: true,
        //         element: <Hot />
        //     },
        //     {
        //         path: 'article',
        //         element: <Atticle />
        //     }
        // ]
    },
    { path: '/projects', element: <Projects /> },
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
