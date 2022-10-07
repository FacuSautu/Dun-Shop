import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = () => {
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
                <li><Link className="dropdown-item" to={`/category/miscelaneos`}>Miscelaneos</Link></li>
                <li><Link className="dropdown-item" to={`/category/armas`}>Armas</Link></li>
                <li><Link className="dropdown-item" to={`/category/armaduras`}>Armaduras</Link></li>
                <li><hr className="dropdown-divider"/></li>
                <li><Link className="dropdown-item" to={`/category/objetos_magicos`}>Objetos magicos</Link></li>
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
