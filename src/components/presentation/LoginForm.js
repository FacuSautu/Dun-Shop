import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ submitAction }) => {

  const [ form, setForm ] = useState({email: undefined, password: undefined});
  const [ validationErrors, setValidationErrors ] = useState({email: undefined, password: undefined});

  const handleSubmit = (ev) => {
    ev.preventDefault();
    
    submitAction(form.email, form.password, setValidationErrors);
  }

  const handleChange = (ev) => {
    const id = ev.target.name;
    const value = ev.target.value;
    setForm({...form,[id]:value});
  }

  return(
    <div className="col-8 offset-2 bg-dark opacity-75 text-white p-3">
      <h2 className="text-center">Iniciar sesion</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-Mail</label>
          <input type="email" className="form-control" name="email" id="email" onChange={handleChange} />
          { validationErrors.email && <div className="form-text text-danger">{validationErrors.email}</div> }
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" name="password" id="password" onChange={handleChange} />
          { validationErrors.password && <div className="form-text text-danger">{validationErrors.password}</div> }
        </div>
        { validationErrors.general && <div className="form-text text-danger">{validationErrors.general}</div> }
        <Link to='/signup'>No tiene cuenta? Registrese!</Link>
        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" className="btn btn-danger">Iniciar Sesion</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;