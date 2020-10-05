import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../styles/AddPurchaseForm.scss';
import { getProducts } from '../../actions/productActions';
import { pushGasto } from '../../actions/ventasActions';
import moment from 'moment';
import Swal from 'sweetalert2';

const AddPurchaseForm = () => {
    const dispatch = useDispatch();
    const products = useSelector(store => store.products.products);
    const idStore = useSelector((store) => store.user.storeSelected)
    const [countDiv, setCountDiv] = useState([]);
    const [total, setTotal] = useState([]);

    const handlerSelectedChange = (e, i) => {
        let id = e.target.value;
        if (id != 1) {
            let temp = [...countDiv];
            let productTemp = products.filter((el) => el.id === id)[0];
            productTemp.cantidad = 0;
            if (i || i === 0) {
                temp[i] = { ...productTemp };
            } else {
                temp = [...temp, { ...productTemp }];
            }
            setCountDiv(temp)
        }
    }

    const checkTheBox = (i) => {
        if (i || i === 0) {
            let temp = [...countDiv];
            temp.splice(i, 1);
            setCountDiv(temp);
        } else {
            setCountDiv([...countDiv, { otroGasto: true, otroGastoDetails: '', otroGastoMonto: '' }]);
        }
    }

    const handlerInputOtrosgastos = (e, i) => {
        const { name, value } = e.target;
        let temp = [...countDiv];
        temp[i] = { ...temp[i], [name]: value };
        setCountDiv(temp);
    }
    const endOperation = () => {
        let mov = {
            date: moment().format('YYYY-MM-DD HH:MM'),
            items: [],
            otrosGastos: [],
            gastoItems: 0,
            gastoOtrosGastos: 0,
            gastoTotal: 0
        };
        let countOtroGasto = 0, countGastoItems = 0, gastoTotal = 0;
        countDiv.forEach((el) => {
            if (el.otroGasto) {
                countOtroGasto += parseInt(el.otroGastoMonto);
                mov.otrosGastos.push(el)
            } else {
                countGastoItems += el.precio * parseInt(el.cantidad)
                mov.items.push(el)
            }
        })
        mov.gastoTotal = countOtroGasto + countGastoItems;
        mov.gastoItems = countGastoItems;
        mov.gastoOtrosGastos = countOtroGasto;
        pushGasto(mov)
    }

    useEffect(() => {
        if (products.length === 0 && idStore) dispatch(getProducts(idStore))
    }, [])

    useEffect(() => {
        let total = 0
        countDiv.forEach((el) => {
            if (el.otroGasto) total += parseInt(el.otroGastoMonto) || 0
            else {
                total += el.precio * parseInt(el.cantidad) || 0
            }
        })
        setTotal(total);
    }, [countDiv])

    return (
        <div className='containerItems'>
            <h3>Agregar gastos</h3>
            <div className="itemsContainer">
                {countDiv?.map((div, i) => (
                    <div className='itemAdd' key={i}>
                        {(countDiv[i]?.otroGasto) ?
                            <>
                                <div className='otroGastoDiv'>
                                    <label for='checkOtroGasto'>Otro gasto</label>
                                    <input id='checkOtroGasto' type="checkbox" checked onChange={() => checkTheBox(i)} />
                                </div>
                                <input required value={countDiv[i].otroGastoDetails} name='otroGastoDetails' type="text" placeholder='Detalles'
                                    onChange={(e) => handlerInputOtrosgastos(e, i)}
                                />
                                <input required value={countDiv[i].otroGastoMonto} type="number" name='otroGastoMonto' placeholder='Total del gasto'
                                    onChange={(e) => handlerInputOtrosgastos(e, i)}
                                />
                            </>
                            :
                            <>
                                <select value={countDiv[i]?.id} onChange={(e) => handlerSelectedChange(e, i)}>
                                    {products.map((pro, i) =>
                                        <option key={i} value={pro.id}>
                                            {pro.name}
                                        </option>
                                    )}
                                </select>
                                <input required type="number" placeholder='cantidad' name='cantidad' value={countDiv[i]?.cantidad} onChange={(e) => handlerInputOtrosgastos(e, i)} />
                                {countDiv[i]?.imagen ?
                                    <img src={countDiv[i]?.imagen} alt={countDiv[i]?.name} />
                                    : <></>
                                }

                                <span>C/U ${countDiv[i]?.precio}</span>
                                <span>costo: ${countDiv[i]?.precio * parseInt(countDiv[i]?.cantidad) || 0}</span>
                            </>
                        }
                    </div>
                ))}
                <div className='itemAdd'>
                    <div className="otroGastoDiv">
                        <label for='checkOtroGasto'>Otro gasto</label>
                        <input id='checkOtroGasto' type="checkbox" checked={false} onChange={() => checkTheBox()} />
                    </div>
                    <select onChange={handlerSelectedChange}>
                        <option value={1}>Seleccione un articulo</option>
                        {products.map((pro, i) =>
                            <option key={i} value={pro.id}>
                                {pro.name}
                            </option>)}
                    </select>
                </div>
            </div>
            <div className='buttonsContainer'>
                <div className="buttons">
                    <span>Total: ${total}</span>
                </div>
                <button
                    className={`endButton ${(!countDiv[0]?.otroGasto && !countDiv[0]?.id) && 'disable'}`}
                    onClick={endOperation}
                >Finalizar operación</button>
            </div>
        </div >
    )
}

export default AddPurchaseForm;