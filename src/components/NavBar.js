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
            <li className="nav-item">
              <label className="nav-link">Products</label>
            </li>
            <li className="nav-item">
              <label className="nav-link">Magical shop</label>
            </li>
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
