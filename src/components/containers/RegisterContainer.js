import { useNavigate } from "react-router-dom/dist";
import Swal from "sweetalert2";

import { addUserAuth, addUser } from "../../util/Firebase";

import RegisterForm from "../presentation/RegisterForm";

const RegisterContainer = () => {

  const navigate = useNavigate();

  const handleLogin = (form, setErrorState) => {
    let valErrors = {
      name: undefined,
      lastname: undefined,
      email: undefined,
      phone: undefined,
      password: undefined,
      re_password: undefined,
      general: undefined
    }
    if(form.password != form.re_password){
      valErrors.re_password = 'Las contraseñas ingresadas no coinciden.';
    }else if(!form.name || form.name.length < 3){
      valErrors.name = 'Debe ingresar algun nombre valido.';
    }else if(!form.lastname || form.lastname.length < 3){
      valErrors.lastname = 'Debe ingresar algun apellido valido.';
    }else if(!form.email || form.email.length < 3){
      valErrors.email = 'Debe ingresar un email valido.';
    }else if(!form.phone || form.phone.length < 3){
      valErrors.phone = 'Debe ingresar un numero de contacto.';
    }else if(!form.password || form.password.length < 3){
      valErrors.password = 'Debe ingresar una contraseña de al menos 6 caracteres.';
    }else{
      Swal.fire({
        title: 'Cargando sus datos',
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          // Spinner de carga.
          Swal.showLoading();
  
          // Carga del usuario.
          addUserAuth(form.email, form.password)
            .then(userCredentials => {
              let userInfo ={
                user_id: userCredentials.user.uid,
                name: form.name,
                lastname: form.lastname,
                email: form.email,
                phone: form.phone
              }
              addUser(userInfo)
                .then(() => {
                  Swal.fire({
                    icon: 'success',
                    text: 'Carga exitosa! Bienvenido',
                    timer: 1500,
                    showConfirmButton: false
                  }).then(() => {
                    navigate('/');
                  });
                })
            })
            .catch(error => {
              switch (error.code) {
                case 'auth/email-already-in-use':
                  valErrors.email = 'El E-Mail ingresado ya tiene una cuenta asociada. Intente con otro.';
                  break;
              
                case 'auth/weak-password':
                  valErrors.password = 'La contraseña ingresada es muy corta, debe ingresar al menos 6 caracteres.';
                  break;

                default:
                  valErrors.general = error.message
                  break;
              }
              setErrorState(valErrors);
            })  
        }
      })
    }
    setErrorState(valErrors);
  }

  return(
    <RegisterForm submitAction={handleLogin} />
  )
}

export default RegisterContainer;