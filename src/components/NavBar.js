import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <label className="navbar-brand" >Dun-Shop</label>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <label className="nav-link active" aria-current="page">Home</label>
            </li>
            <div className="btn-group">
              <button type="button" className="btn text-white dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Productos
              </button>
              <ul className="dropdown-menu">
                <li><label className="dropdown-item">Pociones</label></li>
                <li><label className="dropdown-item">Armas</label></li>
                <li><label className="dropdown-item">Armaduras</label></li>
                <li><hr class="dropdown-divider"/></li>
                <li><label className="dropdown-item">Objetos magicos</label></li>
              </ul>
            </div>
          </ul>
        </div>
        <span className="navbar-text">
          <CartWidget></CartWidget>
        </span>
      </div>
    </nav>
  );
}

export default NavBar;
