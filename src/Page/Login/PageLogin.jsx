import React, { useState, useRef, useEffect } from "react";
import LoginInput from "../../Components/Login/LoginInput";
import { Toast } from "primereact/toast";
import LoginService from "../../Services/LoginService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInUser } from "../../reducers/authSlices";
import { showToast } from "../../helpers/showToast";
import { history } from "../../history";
import { useNotificaciones } from "../../NotificacionesContext";
import { loginService } from "../../Services/AuthService";

export default function PageLogin(props) {

  const {setDataUsuario} = useNotificaciones();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);
  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [my, setMy] = useState(null);
  const handleChangeUsuario = (e) => {
    setUsuario({
      username: e.target.value,
      password: usuario.password,
    });
  };
  const handleChangePassword = (e) => {
    setUsuario({
      username: usuario.username,
      password: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    
    setLoading(usuario);
    try {
      let response=await loginService.login(usuario)
      setDataUsuario(response?.data);
      LoginService.setToken(response?.accessToken);
      setLoading(false);
      history.navigate("/locales");
      showToast("success", "Usuario correcto", `Bienvenido`, toast);
    } catch (error) {
      console.log(error);
      showToast(
        "error",
        "Acceso Denegado",
        `Usuario o contraseña no son los correctos`,
        toast
      );
      setLoading(false);
    console.log("response",response)
    

    }   
    
    //   .then((response) => {



    // })
    // .catch((error) => {


    // });
};

// const showToast = (tipo, titulo, detalle) => {
//   toast.current.show({
//     severity: tipo,
//     summary: titulo,
//     detail: detalle,
//     life: 3000,
//   });
// };
return (
  <div className="index-login">
    <Toast ref={toast} />
    <LoginInput
      valueUsuario={usuario.username}
      onChangeValueUsuario={(e) => {
        handleChangeUsuario(e);
      }}
      valuePassword={usuario.password}
      onChangeValuePassword={(e) => {
        handleChangePassword(e);
      }}
      OnClickIngresar={(e) => {
        handleSubmit(e);
      }}
      disabled={loading}
      label={
        loading ? (
          <i
            className="pi pi-spin pi-spinner"
            style={{ fontSize: "2em" }}
          ></i>
        ) : (
          "Ingresar"
        )
      }
    />
  </div>
);
}

