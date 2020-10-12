import React, { useEffect, useState } from 'react'
import AddStoreForm from '../gestion/addStoreForm'
import { useSelector, useDispatch } from 'react-redux'
import { getStores } from '../../actions/userActions'
import { Link } from 'react-router-dom'
import '../../styles/storeSelector.scss'
import iconStore from '../../media/storeIcon.svg'

const SelectStore = () => {
    const dispatch = useDispatch();
    const userLogged = useSelector(store => store.userLogged.user)
    const stores = useSelector(store => store.user.stores)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        dispatch(getStores(userLogged.id));
        setLoading(true)
    }, [])

    useEffect(() => {
        if (stores.length > 0) {
            setLoading(false)
        }
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }, [stores])

    const selectStore = (id, name) => {
        localStorage.setItem('idStore', id)
        localStorage.setItem('nameStore', name)
        dispatch({ type: 'SET_STORE', payload: id })
    }

    return (
        <div className='storeSelectorScreen'>
            <div className='storeSelectorContainer'>
                {loading && <h4>Cargando...</h4>}
                {!loading && (
                    <>
                        {stores.length > 0 ? (
                            <div className='storeTitle'>
                                <h3>Tus Tiendas</h3>
                                <div className="storesContainer">
                                    {stores.map((store, i) => (
                                        <div key={i} className='storeDiv'>
                                            <img className='iconStore' src={iconStore} alt="" />
                                            <span>{store.name}</span>
                                            <Link to={'/dashboard'}><button onClick={() => selectStore(store.id, store.name)}>Abrir</button></Link>
                                        </div>
                                    )
                                    )}
                                </div>
                            </div>

                        ) : (
                                <div className='withoutStoresWarning'>
                                    <h3>Aún no tiene tiendas cargadas! por favor cree una!</h3>
                                    <AddStoreForm />
                                </div>
                            )}
                    </>
                )}
            </div>
            <svg className='wavesBackground' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#5000ca" fill-opacity="1" d="M0,160L60,160C120,160,240,160,360,186.7C480,213,600,267,720,250.7C840,235,960,149,1080,128C1200,107,1320,149,1380,170.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
        </div>
    )
}

export default SelectStore