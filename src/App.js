import './App.css';

import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <ItemListContainer greeting={"Bienvenido a Dun-Shop! Donde podras encontrar el objeto indicado para para cualquier aventura"}></ItemListContainer>
    </div>
  );
}

export default App;
