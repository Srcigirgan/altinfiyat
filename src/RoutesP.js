import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { AdminEntry } from './pages/AdminEntry';
import ImageUpload from './pages/ImageUpload';
import ImageList from './pages/ImageList';

export const RoutesP = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/admin' element={<AdminEntry />} />
                <Route path='/upload' element={<ImageUpload />} />
                <Route path='/images' element={<ImageList />} />
            </Routes>
        </Router>
    );
};
