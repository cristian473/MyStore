import {GET_PRODUCTS} from '../constants/productConstants'

const initialState = {
    products: []
}

export function getData (state = initialState, action) {

    // console.log(action.payload)
    switch (action.type) {

        case GET_PRODUCTS:
            return action.payload;

    }

        

    return state;
}