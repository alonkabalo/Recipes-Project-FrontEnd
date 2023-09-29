import './App.css';
import Navbar from './components/Navbar/Navbar';
import { useAuth, useRecepies } from './hooks';
import { Route, Routes, useNavigate } from 'react-router';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import NotFound from './pages/404NotFound';
import Register from './pages/Auth/Register';
import RecipePage from './pages/RecipePage/RecipePage';
import Auth from './pages/Auth/Auth';
import AddRecipe from './pages/AddRecipe/AddRecipe';

import AdminBtn from '@mui/icons-material/AddOutlined'

function App() {
  const auth = useAuth()
  const nav = useNavigate()
  return (
    <div className="App">
      <Navbar auth ={auth}/>
      <Routes>
        <Route path='/' element={<Home auth = {auth}/>}/>
        <Route path='/add-recipe' element={<AddRecipe auth = {auth}/>}/>

        <Route path='/recipe/:country/:recipeId' element={<RecipePage/>}/>
        <Route path='/auth' element={<Auth auth ={ auth}/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <div>
      {auth.currentUser?.admin && <div className="add-recipe-btn"  onClick={() => { nav("/add-recipe") }}><AdminBtn/></div>}
      </div>
    </div>
  );
}

export default App;
