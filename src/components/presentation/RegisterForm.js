import { useState } from "react";

const RegisterForm = ({ submitAction }) => {

  const [ form, setForm ] = useState({name:undefined, lastname: undefined, email: undefined, phone: undefined, password: undefined, re_password: undefined});
  const [ validationErrors, setValidationErrors ] = useState({name:undefined, lastname: undefined, email: undefined, phone: undefined, password: undefined, re_password: undefined, general: undefined});

  const handleSubmit = (ev) => {
    ev.preventDefault();
    submitAction(form, setValidationErrors);
  }

  const handleChange = (ev) => {
    const id = ev.target.name;
    const value = ev.target.value;
    setForm({...form,[id]:value});
  }

  return(
    <div className="col-8 offset-2 bg-dark opacity-75 text-white p-3">
      <h2 className="text-center">Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input type="text" className="form-control" name="name" id="name" value={form.name} onChange={handleChange} />
            { validationErrors.name && <div className="form-text text-danger">{validationErrors.name}</div> }
          </div>
          <div className="col-6">
            <label htmlFor="lastname" className="form-label">Apellido</label>
            <input type="text" className="form-control" name="lastname" id="lastname" value={form.lastname} onChange={handleChange} />
            { validationErrors.lastname && <div className="form-text text-danger">{validationErrors.lastname}</div> }
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-Mail</label>
          <input type="email" className="form-control" name="email" id="email" value={form.email} onChange={handleChange} />
          { validationErrors.email && <div className="form-text text-danger">{validationErrors.email}</div> }
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Teléfono</label>
          <input type="text" className="form-control" name="phone" id="phone" value={form.phone} onChange={handleChange} />
          { validationErrors.phone && <div className="form-text text-danger">{validationErrors.phone}</div> }
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" name="password" id="password" value={form.password} onChange={handleChange} />
            { validationErrors.password && <div className="form-text text-danger">{validationErrors.password}</div> }
          </div>
          <div className="col-6">
            <label htmlFor="re_password" className="form-label">Repetir Contraseña</label>
            <input type="password" className="form-control" name="re_password" id="re_password" value={form.re_password} onChange={handleChange} />
            { validationErrors.re_password && <div className="form-text text-danger">{validationErrors.re_password}</div> }
          </div>
        </div>
        { validationErrors.general && <div className="form-text text-danger">{validationErrors.general}</div> }
        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" className="btn btn-danger">Registrar</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm;