import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../../styles/AddPurchaseForm.scss'
import { getProducts } from '../../actions/productActions'
import { pushGasto } from '../../actions/ventasActions'
import Swal from 'sweetalert2'

const AddPurchaseForm = () => {
    const dispatch = useDispatch()
    const products = useSelector(store => store.products.products)
    const idStore = localStorage.getItem('idStore')
    const [countDiv, setCountDiv] = useState([1])
    const [checkBoxes, setCheckBoxes] = useState([false])
    const [productsSelected, setProductsSelected] = useState([]);
    const [otrosGastos, setOtrosgastos] = useState([])

    const handlerSelectChange = (e, i) => {
        let id = e.target.value
        let product = products.filter(el => el.id === id).flat()
        product[0].cantidad = 0;
        product[0].ubi = i;
        console.log(product);
        let newProductsSelected = [...productsSelected]
        let newArray = newProductsSelected.flat()
        newArray[i] = product[0]
        console.log(newArray);
        setProductsSelected(newArray);
    }
    const handlerSelectedChange = (e, i) => {
        let id = e.target.value
        let product = products.filter(el => el.id === id)
        let _newProductsSelected = [...productsSelected]
        product[0].cantidad = 0;
        product[0].ubi = i;
        _newProductsSelected.splice(i, 1, product[0])
        setProductsSelected(_newProductsSelected)
    }

    const handlerSumDiv = () => {
        let newDiv = [...countDiv]
        newDiv.push(1)
        setCountDiv(newDiv);
        setCheckBoxes([...checkBoxes, false])
    }

    const handlerRestDiv = () => {
        let newDiv = [...countDiv]
        let newProductsSelected = [...productsSelected]
        let newOtrosGastos = [...otrosGastos]
        let newCheckBoxes = [...checkBoxes]
        if (newProductsSelected[newProductsSelected.length - 1].ubi === countDiv.length) {
            newProductsSelected.pop();
            setProductsSelected(newProductsSelected)
        }
        else {
            newCheckBoxes.pop()
            newOtrosGastos.pop()
            setOtrosgastos(newOtrosGastos);
            setCheckBoxes(newCheckBoxes);
        }
        newDiv.pop()
        setCountDiv(newDiv);
    }

    const checkTheBox = (i) => {
        let newCheckBoxes = [...checkBoxes]
        let _newGastos = [...otrosGastos];
        let gasto = {
            otrosGastosDetails: '',
            otrosGastos: '',
            ubi: i
        }
        _newGastos.splice(i, 1, gasto)
        newCheckBoxes.splice(i, 1, !newCheckBoxes[i])
        setOtrosgastos(_newGastos)
        setCheckBoxes(newCheckBoxes)
    }

    const stockChange = (e, i) => {
        let number = e.target.value
        let _newProductsSelected = [...productsSelected]
        _newProductsSelected[i].cantidad = number;
        setProductsSelected(_newProductsSelected.flat())
    }

    const handlerInputOtrosgastos = (e, i) => {
        const { value, name } = e.target;
        let _newGastos = [...otrosGastos];
        if (_newGastos[i]) {
            _newGastos[i][name] = value;
        }
        setOtrosgastos(_newGastos);
    }

    const endOperation = () => {
        if (productsSelected.length > 0 || otrosGastos.length > 0) {
            let mov = {
                idTienda: idStore,
                products: [],
                compraDeMateriales: 0,
                otrosGastos: [],
                otrosGastosTotal: 0,
                gastoTotal: 0
            }
            let otrosGastosCount = 0;
            for (let i = 0; i < countDiv.length; i++) {
                if (productsSelected[i]) {
                    let product = {
                        id: productsSelected[i]?.id,
                        itemName: productsSelected[i]?.name,
                        precio: productsSelected[i]?.precio,
                        cantidad: productsSelected[i]?.cantidad
                    };
                    let count = mov.compraDeMateriales;
                    count += productsSelected[i]?.precio * productsSelected[i]?.cantidad;
                    mov.products.push(product);
                    mov.compraDeMateriales = count;
                }
                else {
                    let count = mov.otrosGastosTotal;
                    count += parseInt(otrosGastos?.[otrosGastosCount]?.otrosGastos || 0);
                    mov.otrosGastosTotal = count;
                    if (otrosGastos?.[otrosGastosCount]?.otrosGastos) mov.otrosGastos.push(otrosGastos[otrosGastosCount])
                    otrosGastosCount++;
                }

            }
            mov.gastoTotal = mov.compraDeMateriales + mov.otrosGastosTotal;
            if (mov.gastoTotal === 0) {
                Swal.fire(
                    'Error!',
                    'El total no puede ser 0.',
                    'error'
                )
            } else {
                pushGasto(mov, products)
            }

        }

    }

    useEffect(() => {
        if (products.length === 0 && idStore) dispatch(getProducts(idStore))
    }, [])

    return (
        <div className='containerItems'>
            <h3>Agregar gastos</h3>
            <div className="itemsContainer">
                {countDiv?.map((div, i) => (
                    <>
                        {(productsSelected[i] || checkBoxes[i]) ? (
                            <div className='itemAdd'>
                                {(otrosGastos[i]?.ubi === i) ?
                                    <>
                                        <div className='otroGastoDiv'>
                                            <label for='checkOtroGasto'>Otro gasto</label>
                                            <input id='checkOtroGasto' type="checkbox" checked onChange={() => checkTheBox(i)} />
                                        </div>
                                        <input required type="text" name='otrosGastosDetails' placeholder='Detalles' onChange={(e) => handlerInputOtrosgastos(e, i)} />
                                        <input required type="number" name='otrosGastos' placeholder='Total del gasto' onChange={(e) => handlerInputOtrosgastos(e, i)} />
                                    </>
                                    :
                                    <>
                                        <select value={productsSelected[i]?.id} onChange={(e) => handlerSelectedChange(e, i)}>
                                            {products.map((pro) =>
                                                <option value={pro.id}>
                                                    {pro.name}
                                                </option>
                                            )}
                                        </select>
                                        <input required type="number" placeholder='cantidad' value={productsSelected[i].cantidad || ''} onChange={(e) => stockChange(e, i)} />
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
                                    <select onChange={(e) => handlerSelectChange(e, i)}>
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
            </div>
            <div className='buttonsContainer'>
                <div className="buttons">
                    <button onClick={handlerRestDiv}>-</button>
                    <button onClick={handlerSumDiv}>+</button>
                </div>
                <button
                    className={`endButton ${productsSelected.length === 0 && otrosGastos.length === 0 && 'disable'}`}
                    onClick={endOperation}
                >Finalizar operación</button>
            </div>
        </div >
    )
}

export default AddPurchaseForm;