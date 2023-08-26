import './App.css';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Home from './Pages/userPages/Home';
import Signup from './Pages/userPages/Signup';
import Login from './Pages/userPages/Login';
import PagenotFound from './Pages/userPages/PagenotFound';
import Dashboard from './Pages/userPages/Dashboard';
import Address from './Pages/userPages/Address';
import PrivateRoute from './router/PrivateRoute';
import AdminRoute from "./router/AdminRoute"
import AdminDashboard from './Pages/admin/AdminDashboard';
import CreateCategory from './Pages/admin/CreateCategory';
import CreateProduct from './Pages/admin/CreateProduct';
import ProductCom from './components/productCom/ProductCom';
import ProductUpdate from './components/adminCom/ProductUpdate';
import ProductPage from './Pages/userPages/ProductPage';
import Wishlist from './Pages/userPages/Wishlist';
import Cart from './Pages/userPages/Cart';
import CheckOut from './Pages/userPages/CheckOut';
function App() {

  return (

      <Router>
        <Routes>
          <Route path='/dashboard/user' element={<PrivateRoute/>}>
              <Route path='' element={<Dashboard/>}/>
              <Route path='wishlist' element={<Wishlist/>}/>
              <Route path="cart"  element={<Cart/>}/>
          </Route>

          <Route path='/dashboard' element={<AdminRoute/>}>
              <Route path='admin' element={<AdminDashboard/>}/>
              <Route path='create-category' element={<CreateCategory/>}/>
              <Route path='create-product' element={<CreateProduct/>} />
          </Route>
          <Route path='/checkout' element={<PrivateRoute/>}>
            <Route path='' element={<CheckOut/>}/>
          </Route>
          
          <Route path='*' element={<PagenotFound/>}/>
          <Route path='/' element={<Home/>}/>  
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/address' element={<Address/>}/>
          <Route path='/product' element={<ProductPage/>}/>
          <Route path='/productCom/:id' element={<ProductCom/>}/>
          <Route path='/productupdate/:slug' element={<ProductUpdate/>}/>
        </Routes>
      </Router>
  );
  
}

export default App;
