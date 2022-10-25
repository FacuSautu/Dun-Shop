import { BrowserRouter, Routes, Route } from "react-router-dom";

import CartContextProvider from "./components/providers/CartContextProvider";

import NavBar from './components/presentation/NavBar';
import ItemListContainer from './components/containers/ItemListContainer';
import ItemDetailContainer from "./components/containers/ItemDetailContainer";
import Cart from "./components/presentation/Cart";

function App() {
  return (
    <div style={{backgroundColor: "#CE4343", minHeight: "100vh"}}>
      <CartContextProvider>
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route exact path="/" element={<ItemListContainer rootPath  ={"./"} />} />
            <Route exact path="/category/:id" element={<ItemListContainer rootPath  ={"../"} />} />
            <Route exact path="/item/:id" element={<ItemDetailContainer />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
