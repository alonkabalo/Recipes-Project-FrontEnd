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
import MyCards from './pages/MyCards/MyCards';
import About from './pages/About/About';
import AddOutlined from "@mui/icons-material/AddCircleOutline"
import EditRecipe from './pages/EditRecipe/EditRecipe';
import Favorites from './pages/Favorites/Favorites';
const addRecipeButtonStyle = { position: 'fixed', right: '32px', bottom: '32px', zIndex: '9999', fontSize: '48px', cursor: 'pointer', background: 'white', borderRadius: '50%', color: '#0047AB' }
function App() {
  const auth = useAuth()
  const nav = useNavigate()
  return (
    <div className="App">
      <Navbar auth={auth} />
      <Routes>
        <Route path='/' element={<Home auth={auth} />} />
        <Route path='/add-recipe' element={<AddRecipe auth={auth} />} />
        <Route path='/my-recipes' element={<MyCards auth={auth} />} />
        <Route path='/favorites' element={<Favorites auth={auth} />} />

        <Route path='/about' element={<About auth={auth} />} />
        <Route path='/edit-recipe/:country/:recipeId' element={<EditRecipe auth={auth} />} />

        <Route path='/recipe/:country/:recipeId' element={<RecipePage auth={auth} />} />
        <Route path='/auth' element={<Auth auth={auth} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <AddOutlined style={addRecipeButtonStyle} onClick={() => nav("/add-recipe")} />
      <div>
        {auth.currentUser?.admin && <div className="add-recipe-btn" onClick={() => { nav("/add-recipe") }}><AdminBtn /></div>}
      </div>
    </div>
  );
}

export default App;
