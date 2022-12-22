import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import crud from '../conexiones/crud';
import swal from 'sweetalert';

const Login = () => {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  })

  const { email, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  const autenticarUsuario = async () => {
    const data = {
      email: usuario.email,
      password: usuario.password
    }

    const response = await crud.POST(`/api/auth`, data);
    const mensaje = response.msg;
    console.log(mensaje);
    if (mensaje === 'el usuario no existe') {
      const mensaje = "el usuario no existe";
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      })
    } else if (mensaje === 'password incorrecto') {
      const mensaje = "password incorrecto";
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      })
    } else {

      const jwt = response.token;

      localStorage.setItem('token', jwt);


      //redireccionar a la pantalla de admistrador
      navigate("/admin");
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    autenticarUsuario();
  }



  return (
    <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
      <div className='md:w-2/3 lg:w-2/5'>
        <h1 className="inline bg-gradient-to-r from-cyan-400 via-cyan-700 to-cyan-400 bg-clip-text font-display text-5xl tracking-tight text-transparent">
          Iniciar Sesion Admin
        </h1>

        <form
          className='my-10 bg-white slate-200 rounded-lg p-10 '
          onSubmit={onSubmit}
        >
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold' >Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Email de Registro'
              className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
              value={email}
              onChange={onChange}
            />

            <label className='uppercase text-gray-600 block text-xl font-bold' >password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Password de Registro'
              className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
              value={password}
              onChange={onChange}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-cyan-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-cyan-400 transition-colors"
          />
          <Link
            to={"/crear-cuenta"}
            className="block text-center my-5 text-cyan-900 uppercase text-sm"
          >Crear Cuenta</Link>

        </form>


      </div>
    </main>
  );
}

export default Login;