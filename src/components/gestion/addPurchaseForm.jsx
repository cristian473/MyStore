import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../../styles/AddPurchaseForm.scss'
import { getProducts } from '../../actions/productActions'

const AddPurchaseForm = () => {
    const dispatch = useDispatch()
    const products = useSelector(store => store.products.products)
    const idStore = localStorage.getItem('idStore')
    const [countDiv, setCountDiv] = useState([1])
    const [checkBoxes, setCheckBoxes] = useState([false])
    const [productsSelected, setProductsSelected] = useState([]);

    const handlerSelectChange = (e) => {
        let id = e.target.value
        let product = products.filter(el => el.id === id)
        product[0].cantidad = 0;
        let newProductsSelected = [...productsSelected, product.flat()]
        setProductsSelected(newProductsSelected.flat());
    }
    const handlerSelectedChange = (e, i) => {
        let id = e.target.value
        let product = products.filter(el => el.id === id)
        let _newProductsSelected = [...productsSelected]
        product[0].cantidad = 0;
        _newProductsSelected.splice(i, 1, product)
        setProductsSelected(_newProductsSelected.flat())
    }
    const handlerSumDiv = () => {
        let newDiv = [...countDiv]
        newDiv.push(1)
        setCountDiv(newDiv);
        setCheckBoxes([...checkBoxes, false])
    }

    const handlerRestDiv = () => {
        let newDiv = [...countDiv]
        let newCheckBoxes = [...checkBoxes]
        newCheckBoxes.pop()
        newDiv.pop()
        setCountDiv(newDiv);
        setCheckBoxes(newCheckBoxes);
    }

    const checkTheBox = (i) => {
        let newCheckBoxes = [...checkBoxes]
        newCheckBoxes.splice(i, 1, !newCheckBoxes[i])
        setCheckBoxes(newCheckBoxes)
    }

    const stockChange = (e, i) => {
        let number = e.target.value
        let _newProductsSelected = [...productsSelected]
        _newProductsSelected[i].cantidad = number;
        setProductsSelected(_newProductsSelected.flat())
    }

    useEffect(() => {
        if (products.length === 0 && idStore) dispatch(getProducts(idStore))
    }, [])

    return (

        <div className='containerItems'>
            <h3>Agregar gastos</h3>
            {countDiv?.map((div, i) => (
                <>
                    {(productsSelected.length > i || checkBoxes[i]) ? (
                        <div className='itemAdd'>

                            {checkBoxes[i] ?
                                <>
                                    <div className='otroGastoDiv'>
                                        <label for='checkOtroGasto'>Otro gasto</label>
                                        <input id='checkOtroGasto' type="checkbox" checked onChange={() => checkTheBox(i)} />
                                    </div>
                                    <input type="text" placeholder='Detalles' />
                                    <input type="number" placeholder='Total del gasto' />
                                </>
                                :
                                <>
                                    <select defaultValue={productsSelected[i].id} onChange={(e) => handlerSelectedChange(e, i)}>
                                        {products.map((pro) =>
                                            <option value={pro.id}>
                                                {pro.name}
                                            </option>
                                        )}
                                    </select>
                                    <input type="number" placeholder='cantidad' onChange={(e) => stockChange(e, i)} />
                                    {productsSelected[i].imagen ?
                                        <img src={productsSelected[i].imagen} alt={productsSelected[i].name} />
                                        : <></>
                                    }

                                    <span>C/U ${productsSelected[i].precio}</span>
                                    <span>costo: ${productsSelected[i].precio * parseInt(productsSelected[i].cantidad) || 0}</span>
                                </>
                            }
                        </div>
                    ) : (
                            <div className='itemAdd'>
                                <div className="otroGastoDiv">
                                    <label for='checkOtroGasto'>Otro gasto</label>
                                    <input id='checkOtroGasto' type="checkbox" onChange={() => checkTheBox(i)} />
                                </div>
                                <select onChange={(e) => handlerSelectChange(e)}>
                                    <option value='' >Seleccione un articulo</option>
                                    {products.map((pro) =>
                                        <option value={pro.id}>
                                            {pro.name}
                                        </option>)}
                                </select>
                            </div>
                        )}
                </>
            ))}
            <div className='buttons'>
                <button onClick={handlerSumDiv}>+</button>
                <button onClick={handlerRestDiv}>-</button>
            </div>
        </div >
    )
}

export default AddPurchaseForm;