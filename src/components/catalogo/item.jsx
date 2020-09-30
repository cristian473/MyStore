import React from 'react'
import '../../styles/itemStyles.scss'
const Item = ({ item }) => {
    return (
        <div className='itemDiv'>
            <h4>{item.cantidad} | {item.name}</h4>
        </div>
    )
}

export default Item