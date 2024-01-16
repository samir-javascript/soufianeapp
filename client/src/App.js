
import Header from "./component/HeaderComponent/Header";
import { Routes, Route} from 'react-router-dom'
import Home from "./pages/HomeScreen/Home";
import ProductDetailsPage from "./pages/ProductPage/ProductDetailsPage";
import CartPage from "./pages/cartPage/CartPage";
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Shipping from "./pages/shippingPage/Shipping";
import Payment from "./pages/PaymentPage/Payment";
import PrivateRoute from "./component/PrivateRouteComponent/PrivateRoute";

import Order from "./pages/oredrPage/Order";
import OrderItem from "./pages/OrderItemPage/OrderItem";
import Profile from "./pages/ProfilePage/Profile";
import AdminRoute from "./component/AdminComponent/Admin";
import OrderList from "./pages/admin/orderListPage/OrderList";
import ProductList from "./pages/admin/ProductListComponent/ProductList";
import UserList from "./pages/admin/userListComponent/UserList";

import EditProduct from "./pages/admin/EditProductPage/EditProductPage";
import EditUser from "./pages/admin/EditUserPage/EditUser";
import Category from "./pages/CategoryPage/Category";
import Footer from "./component/FooterComponent/Footer";
import Wishlist from "./pages/wishlistPage/Wishlist";
import TopHeader from "./component/topHeaderComponent/TopHeader";
import NotFound from "./component/NotFoundPage/NotFound";




function App() {
  return (
    <div className="app-container">
    <TopHeader />
        <Header />
         <div className="content">
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route  path="/page/:pageNumber" element={<Home />} />
                <Route  path="/search/:keyword" element={<Home />} />
                <Route  path="/search/:keyword/page/:pageNumber" element={<Home />} />
                <Route path="/category/:categoryName" element={<Home />} /> {/* New route for category filter */}
                 <Route path="/category/:categoryName/page/:pageNumber" element={<Home />} /> {/* Page number for category filter */}
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route path="/browse-products/:category" element={<Category />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
               
                <Route path="" element={<PrivateRoute />} >
                   <Route path="/shipping" element={<Shipping />} />
                   <Route path="/payment" element={<Payment />} />
                   <Route path="/place-order" element={<Order />} />
                   <Route path="/order/:id" element={<OrderItem />} />
                   <Route path="/profile" element={<Profile />} />
                   <Route path="/browse-wishlist-products" element={<Wishlist />} />
                </Route>
                <Route path="" element={<AdminRoute />} >
                    <Route path="/admin/ordersList" element={<OrderList />} />
                    <Route path="/admin/productsList" element={<ProductList />} />
                    <Route path="/admin/productsList/:pageNumber" element={<ProductList />} />
                    <Route path="/admin/usersList" element={<UserList />} />
                    <Route path="/admin/product/:id/edit" element={<EditProduct />} />
                    <Route path="/admin/user/:id/edit" element={<EditUser />} />
                </Route>
                <Route path="/register" element={<Register />} />
              
            </Routes>
         </div>
         <Footer />
        
         <ToastContainer />
    </div>
  );
}

export default App;