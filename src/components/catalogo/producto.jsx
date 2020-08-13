import React from 'react'

const Producto = ({name, precio, stock, imagen}) => {

    return (
        <div>
            <button> + </button>
            <div>{name} {stock} {precio}</div>
            <img src={imagen} alt={name}/>
            <button> - </button>
        </div>
    )

}

export default Producto