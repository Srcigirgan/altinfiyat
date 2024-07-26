import { BrowserRouter as Router,  Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage'
import { AdminEntry } from './pages/AdminEntry';
export const RoutesP = () => {
    return (
     <Router>
            <Routes>
            <Route path ='/' element={<MainPage/>}/>
            <Route path ='/admin' element={<AdminEntry/>}/>

            </Routes>
     </Router>
    )
} 