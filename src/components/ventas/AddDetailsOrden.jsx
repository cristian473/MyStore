import React, { useState } from 'react'

const AddDetailsOrden = (props) => {
    const products = props.location.state.productos

    let total = 0;

    return (
        <div>
            {products.map((e, i) => {
                total += e.cantidad * e.precio;
                return (
                    <div key={i}>
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

export default AddDetailsOrden