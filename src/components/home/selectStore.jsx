import React, { useEffect } from 'react'
import ListaProductos from '../catalogo/listaProductos'
import AddProductForm from '../gestion/addProductForm'
import AddStoreForm from '../gestion/addStoreForm'
import { useSelector, useDispatch } from 'react-redux'
import {getStores} from '../../actions/userActions'

const SelectStore = () => {
    const dispatch = useDispatch();
    const userLogged = useSelector(store => store.userLogged)
    const stores = useSelector(store => store.user.stores)

    useEffect(() => {
        dispatch(getStores(userLogged.id));
    }, [])

    return (
        <div>
            {stores ? (
                <div>
                    {stores.map(store => (
                        <div>
                            <h3>{store.name}</h3>
                        </div>
                    )
                    )}
                </div>
                
            ):(
                <div>
                    <h3>aún no tiene tiendas cargadas! por favor seleccione una!</h3>
                    <AddStoreForm/>
                </div>
                
            )}
            <ListaProductos/>
            <AddProductForm/>
            
        </div>
    )
}

export default SelectStore