import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from './reducers/index'

// En esta constante almacenamos el Store.

const store = createStore(reducers, applyMiddleware(thunk));

// Exportamos el Store para usarlo en otro archivo.
export default store