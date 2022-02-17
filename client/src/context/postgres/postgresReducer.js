import {SHOW_LOADER, FETCH_GOODS, STOP_LOADER} from '../types'

const handlers = {
    DEFAULT: state => state,

    [SHOW_LOADER]: state => ({...state, loading: true}),

    [FETCH_GOODS]: (state, {payload, payload2, payload3, filterFunction}) => ({...state, goods: payload, favourites: payload2, item: payload3, filterFunc: filterFunction, loading: false}),

    [STOP_LOADER]: (state) => ({...state, loading: false})
}

export const postgresReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT

    return handle(state, action)
}