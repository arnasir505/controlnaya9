import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Categories from './pages/Categories/Categories';
import NotFound from './pages/NotFound/NotFound';
import Transactions from './pages/Transactions/Transactions';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Transactions />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
