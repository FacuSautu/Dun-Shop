import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContextProvider from "./components/providers/UserContextProvider";
import CartContextProvider from "./components/providers/CartContextProvider";

import NavBar from './components/presentation/NavBar';
import LoginContainer from "./components/containers/LoginContainer";
import RegisterContainer from "./components/containers/RegisterContainer";
import ItemListContainer from './components/containers/ItemListContainer';
import WishlistContainer from "./components/containers/WishlistContainer";
import ItemDetailContainer from "./components/containers/ItemDetailContainer";
import Cart from "./components/presentation/Cart";
import NotFound from "./components/presentation/NotFound";

function App() {
  return (
    <div style={{backgroundColor: "#CE4343", minHeight: "100vh"}}>
      <UserContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <NavBar />

            <Routes>
              <Route exact path="/" element={<ItemListContainer rootPath={"./"} />} />
              <Route exact path="/login" element={<LoginContainer />} />
              <Route exact path="/signup" element={<RegisterContainer />} />
              <Route exact path="/category/:id" element={<ItemListContainer rootPath={"../"} />} />
              <Route exact path="/wishlist" element={<WishlistContainer rootPath={"../"} />} />
              <Route exact path="/item/:id" element={<ItemDetailContainer />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
