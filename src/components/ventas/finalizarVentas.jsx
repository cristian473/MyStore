import React, { useState } from 'react'

const FinalizarVenta = (props) => {

    const idTienda = props.match.params.idStore;
    const products = props.location.state.productos
    console.log(products)

    let total = 0;

    return (
        <div>
            {products.map(e => {

                total += e.cantidad * e.precio;

                return(
                    <div>
                    <h4>{e.name}</h4>
                    <h4>unidades: {e.cantidad}</h4>
                    
                </div>
                )

            }
                
            )}
            <h2>total: {total}</h2>
        </div>
    )

}

export default FinalizarVenta