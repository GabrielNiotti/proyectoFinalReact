import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ()=> {
    const [email, setEmail] = useState("");
    const [pasword, setPasword] = useState("");
    const navegar = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pasword)
        .then((credencialUsuario) => {
            const usuario = credencialUsuario.user;
            console.log ("El usuario a sido identificado:", usuario);
            alert("¡Inicio de sesión exitosa!");
            navegar('/') //
        })
        .catch ((error) => {
            const errorCode = error.code;
            const errorMessaje = error.messaje;
            console.error("Error en el loguin:", errorCode, errorMessaje);
        });
    };
    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) = setEmail(e.target.value)} />
                <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPasword(e.target.value)} />
             <button type="submit">Ingresar</button>       
            </form>
        </div>
    );


};

export default Login;