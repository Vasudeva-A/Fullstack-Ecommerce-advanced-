 import HomePage from "./Components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Auths/Register";
import Navbar from "./Includes/Navbar";
import Login from "./Auths/Login";
 import Cart from "./Components/Cart";
import Products from "./Components/Products";
import Category from "./Components/Category";
import CategoryProductsPage from "./Pages/CategoryProductsPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
     
      <BrowserRouter>
      <nav>
         <Navbar/>
      </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />  
          <Route path="/login" element={<Login />} />  
          <Route path="/products" element={<Products/>} />  
          <Route path="/products/:id" element={<ProductDetailPage/>} />  
          <Route path="/cart" element={<Cart />} />  
          <Route path="/category" element={<Category />} />  
          <Route path="/category/:id" element={<CategoryProductsPage />} />  
          <Route path="/profile" element={<ProfilePage />} />  
        </Routes>
      </BrowserRouter>
     
  );
}

export default App;
