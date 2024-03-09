import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Categories from './pages/Categories/Categories';
import NotFound from './pages/NotFound/NotFound';
import TransactionsModal from './components/TransactionsModal/TransactionsModal';

const App = () => {
  return (
    <>
      <Navbar />
      <TransactionsModal />
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/categories' element={<Categories />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
