import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from "./components/ItemDetailContainer";

function App() {
  return (
    <div style={{backgroundColor: "#CE4343", minHeight: "100vh"}}>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<ItemListContainer rootPath={"./"} />} />
          <Route exact path="/category/:id" element={<ItemListContainer rootPath={"../"} />} />
          <Route exact path="/item/:id" element={<ItemDetailContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
