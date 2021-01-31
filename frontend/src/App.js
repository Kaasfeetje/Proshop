import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartScreen from "./pages/CartScreen";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/shipping" component={ShippingPage} />
                    <Route path="/payment" component={PaymentPage} />
                    <Route path="/placeorder" component={PlaceOrderPage} />
                    <Route path="/order/:id" component={OrderPage} />
                    <Route path="/product/:id" component={ProductPage} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/admin/userlist" component={UserListPage} />
                    <Route
                        path="/admin/user/:id/edit"
                        component={UserEditPage}
                    />
                    <Route
                        path="/admin/productlist"
                        component={ProductListPage}
                        exact
                    />
                    <Route
                        path="/admin/productlist/:pageNumber"
                        component={ProductListPage}
                    />
                    <Route
                        path="/admin/product/:id/edit"
                        component={ProductEditPage}
                    />
                    <Route
                        path="/admin/orderlist"
                        component={OrderListPage}
                        exact
                    />

                    <Route
                        path="/admin/orderlist/page/:pageNumber"
                        component={OrderListPage}
                    />
                    <Route
                        path="/admin/orderlist/search/:keyword"
                        component={OrderListPage}
                        exact
                    />
                    <Route
                        path="/admin/orderlist/search/:keyword/page/:pageNumber"
                        component={OrderListPage}
                    />

                    <Route path="/search/:keyword" component={HomePage} exact />
                    <Route
                        path="/search/:keyword/page/:pageNumber"
                        component={HomePage}
                        exact
                    />
                    <Route
                        path="/page/:pageNumber"
                        component={HomePage}
                        exact
                    />
                    <Route path="/admin/analytics" component={AnalyticsPage} />
                    <Route path="/" component={HomePage} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
