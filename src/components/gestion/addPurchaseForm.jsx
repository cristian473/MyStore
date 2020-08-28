import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../../styles/AddPurchaseForm.scss'
const AddPurchaseForm = () => {

    const products = useSelector(store => store.products.products)
    const [countDiv, setCountDiv] = useState([1])
    const [productSelected, setProductSelected] = useState([])
    const [productsSelected, setProductsSelected] = useState([]);

    const handlerSelectChange = () => {
        console.log(productsSelected)
    }
    const handlerSumDiv = () => {
        let newDiv = [...countDiv]

        newDiv.push(1)

        setCountDiv(newDiv);

    }

    const handlerRestDiv = () => {
        let newDiv = [...countDiv]

        newDiv.pop()

        setCountDiv(newDiv);

    }

    return (

        <div className='containerItems'>
            {countDiv?.map((div, i) => (

                <div className='itemAdd'>
                    {productsSelected.length > 0 ? (
                        <>
                        <select defaultValue={productsSelected?.name} onChange={() => handlerSelectChange(productSelected)}>

                            {products.map((pro) =>
                                <option>
                                    {pro.name}
                                </option>)}
                        </select>

                        {productsSelected[i].name}
                        <img src={productsSelected[i].imagen} alt={productsSelected[i].name}/>
                        
                        {productsSelected[i].total}


                        </>
                    ): (
                            <select onChange={() => handlerSelectChange(productSelected)}>

                            {products.map((pro) =>
                                <option>
                                    {pro.name}
                                </option>)}
                            </select>
                )}


            </div>
            )
        )}
        <div className='buttons'>

        <button onClick={handlerSumDiv}>+</button>
        <button onClick={handlerRestDiv}>-</button>
        </div>

        
    </div >
    ) 
}

export default AddPurchaseForm;