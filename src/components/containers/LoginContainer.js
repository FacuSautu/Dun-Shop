import { useNavigate } from "react-router-dom/dist";
import Swal from "sweetalert2";

import { logIn } from "../../util/Firebase";

import LoginForm from "../presentation/LoginForm";

const LoginContainer = () => {

  const navigate = useNavigate();

  const handleLogin = (email, password, setErrorState) => {
    let valErrors = {
      email: undefined,
      password: undefined,
      general: undefined
    };
    if(!email){
      valErrors.email = 'Debe indicar un email.';
    }else if(!password){
      valErrors.password = 'Debe indicar una contraseña.';
    }else{
      Swal.fire({
        title: 'Cargando sus datos',
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          // Spinner de carga.
          Swal.showLoading();
  
          // Login del usuario.
          logIn(email, password)
            .then(() => {
              Swal.fire({
                icon: 'success',
                text: 'Bienvenido!',
                timer: 1500,
                showConfirmButton: false
              }).then(() => {
                navigate('/');
              })
            })
            .catch(error => {

              switch (error.code) {
                case 'auth/user-not-found':
                  valErrors.email = 'No se encontro usuario con ese E-Mail.';
                  break;
              
                case 'auth/wrong-password':
                  valErrors.password = 'Contraseña incorrecta, vuelva a intentar.';
                  break;
      
                default:
                  valErrors.general = error;
                  break;
              }
      
              Swal.close();
              setErrorState(valErrors);
            })
        }
      })
    }
    setErrorState(valErrors);
  }

  return(
    <LoginForm submitAction={handleLogin} />
  )
}

export default LoginContainer;