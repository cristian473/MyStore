import React from 'react'
import OrdenVenta from '../ventas/ordenDeVenta'
import '../../styles/bottonOptions.scss'
const BottonOptions = ({idStore}) => {

    

    return (
        <div className='bottonContainer'>
            <div className='ordenVentaContainer'>
            <OrdenVenta idStore={idStore}/>
            </div>
            <div className='optionsContainer' >
                <div className='datosContainer'>
                    <div className='valueDiv'>
                       <h4>ingresos:</h4> 
                        <h3>$10.524</h3>
                    </div>
                    <div className='valueDiv'>
                        <h4>gastos:</h4> 
                        <h3>$10.524</h3>
                    </div>

                    <div className='valueDiv'>
                        <h4>balance:</h4>
                        <h3>$10.524</h3>
                    </div>
                    
                </div>
                <div className='buttonsContainer'>
                    <div>
                        Agregar producto
                    </div>
                    <div>
                        Agregar compra de materiales
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BottonOptions