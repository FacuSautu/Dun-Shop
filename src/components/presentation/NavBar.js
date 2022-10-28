import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getCategories, logOut } from "../../util/Firebase";

import Contexts from "../../context/Contexts";

import CartWidget from "./CartWidget";

const NavBar = () => {

  const [categories, setCategories] = useState([]);
  const userCtx = useContext(Contexts.userContext);

  useEffect(() => {
    getCategories('categories').then(categories => {
      let categoriesCol = categories.docs.map(category => ({ id: category.id, ...category.data()}));
      
      setCategories(categoriesCol);
    });
  }, []);

  const handleLogOut = () => {
    logOut();
  }

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to={'/'} >Dun-Shop</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <label className="" aria-current="page">
                <Link className="nav-link active" to={'/'}>Home</Link>
              </label>
            </li>
            <div className="btn-group">
              <button type="button" className="btn text-white dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Productos
              </button>
              <ul className="dropdown-menu">
                {categories.map(category => <Link key={category.index} className="dropdown-item" to={`/category/${category.index}`}>{category.description}</Link>)}
              </ul>
            </div>
            {userCtx.user && (
              <li className="nav-item">
                <label className="" aria-current="page">
                  <Link className="nav-link active" to={'/wishlist'}>Tu Wishlist</Link>
                </label>
              </li>
            )}
          </ul>
        </div>
          {(userCtx.user) ? (
            <div className="btn-group">
              <button type="button" className="btn text-white dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Bienvenido {`${userCtx.user.name} ${userCtx.user.lastname}`}!
              </button>
              <ul className="dropdown-menu">
                <span className="dropdown-item" onClick={handleLogOut}>Logout</span>
              </ul>
            </div>
          ):(
            <>
              <Link className="nav-link active text-white me-3" to={'/login'}>Login</Link>
              <Link className="nav-link active text-white me-3" to={'/signup'}>Registrarse</Link>
            </>
          )}
        <span className="navbar-text">
          <CartWidget/>
        </span>
      </div>
    </nav>
  );
}

export default NavBar;
