import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../util/Firebase";

import CartWidget from "./CartWidget";

const NavBar = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories('categories').then(categories => {
      let categoriesCol = categories.docs.map(category => ({ id: category.id, ...category.data()}));
      
      setCategories(categoriesCol);
    });
  }, []);

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
          </ul>
        </div>
        <span className="navbar-text">
          <CartWidget/>
        </span>
      </div>
    </nav>
  );
}

export default NavBar;
