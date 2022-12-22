import React from 'react'
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import crud from '../../conexiones/crud';

export const ViewProductos = ({ producto }) => {
    const { idProducto } = useParams();

    const { nombre, descripcion, stock, precio, imagen } = producto;

    const borrarProducto = async (idProducto) => {
        swal({
            title: "estas seguro de eliminar producto",
            text: "una vez elimnado mp se prodra recuperar",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const response = crud.DELETE(`/api/producto/${idProducto}`);
                    const mensaje = response;
                    if (mensaje) {
                        swal("producto eliminado correctamente", {
                            icon: "success",
                        })
                    }
                    window.location.reload();
                } else {
                    swal("se cancelo la accion");
                }
            });
    }

    return (
        <div
            className='border-r p-5 flex justify-between items-center'
        >
            <div className='flex flex-col items-start'>
                <p className='mb-1 text-xl text-gray-600'>nombre:{nombre}</p>
                <p className='mb-1 text-xl text-gray-600'>descripción:{descripcion}</p>
                <p className='mb-1 text-xl text-gray-600'>stock:{stock}</p>
                <p className='mb-1 text-xl text-gray-600'>precio:{precio}</p>
                <img src={imagen} width="150" height="150"></img>
            </div>

            <div className='flex flex-col lg:flex-row gap-2'>
                <Link
                    to={`/actualizar-producto/${idProducto}`}
                    className=" block text-center my-5 text-black-900 uppercase text-sm"
                >Editar</Link>
                <button
                    className="bg-rose-600 px-1 py-1 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={() => borrarProducto(producto._id)}
                >Eliminar</button>
            </div>

        </div>
    )
}

export default ViewProductos;