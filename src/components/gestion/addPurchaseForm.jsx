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
    const [total, setTotal] = useState(0);

    function toNumber(str) {
        return str * 1;
    }
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
        if (total === 0) {
            Swal.fire(
                'Error!',
                'El TOTAL no puede ser 0',
                'error'
            )
        } else {
            let mov = {
                date: moment().format('YYYY-MM-DD HH:MM'),
                items: [],
                otrosGastos: [],
                gastoItems: 0,
                gastoOtrosGastos: 0,
                gastoTotal: 0,
                idTienda: idStore
            };
            let countOtroGasto = 0, countGastoItems = 0, gastoTotal = 0;
            countDiv.forEach((el) => {
                if (el.otroGasto) {
                    let sum = parseFloat(countOtroGasto)
                    countOtroGasto = sum + toNumber(parseFloat(parseInt(el.otroGastoMonto)).toFixed(2))
                    mov.otrosGastos.push(el)
                } else {
                    let sum = parseFloat(countGastoItems)
                    countGastoItems = sum + toNumber(parseFloat(parseFloat(el.costoMaterial) * parseInt(el.cantidad)).toFixed(2))
                    mov.items.push(el)
                    debugger;
                }
            })

            mov.gastoTotal = countOtroGasto + countGastoItems;
            mov.gastoItems = countGastoItems;
            mov.gastoOtrosGastos = countOtroGasto;
            pushGasto(mov)
        }
    }

    useEffect(() => {
        if (products.length === 0 && idStore) dispatch(getProducts(idStore))
    }, [])

    useEffect(() => {
        let sumTotal = ''
        countDiv.forEach(({ otroGastoMonto = 0, otroGasto = 0, cantidad = 0, costoMaterial = 0 }) => {
            if (otroGasto) sumTotal += parseInt(otroGastoMonto) || 0
            else {
                let costo = parseFloat(parseFloat(costoMaterial) * parseInt(cantidad)).toFixed(2)
                console.log(costo);
                if (costo > 0) {
                    sumTotal = sumTotal + costo;
                }
            }
        })
        if (sumTotal > 0) {
            setTotal(sumTotal);
        } else {
            setTotal(0)
        }
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
                                            {pro.productName}
                                        </option>
                                    )}
                                </select>
                                <input required type="number" placeholder='cantidad' name='cantidad' value={countDiv[i]?.cantidad} onChange={(e) => handlerInputOtrosgastos(e, i)} />
                                {countDiv[i]?.imagen ?
                                    <img src={countDiv[i]?.imagen} alt={countDiv[i]?.productName} />
                                    : <></>
                                }

                                <span>C/U ${countDiv[i]?.costoMaterial}</span>
                                <span>costo: ${`${!countDiv[i]?.cantidad ? 0 :
                                    parseFloat(countDiv[i]?.costoMaterial * parseInt(countDiv[i]?.cantidad)).toFixed(2)
                                    }`}</span>
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
                                {pro.productName}
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