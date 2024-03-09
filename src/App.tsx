import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Categories from './pages/Categories/Categories';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/categories' element={<Categories />} />
      </Routes>
    </>
  );
};

export default App;
