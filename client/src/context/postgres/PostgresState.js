import React, {useReducer} from 'react'
import {postgresContext} from './postgresContext'
import {postgresReducer} from './postgresReducer'
import {SHOW_LOADER, FETCH_GOODS, STOP_LOADER} from '../types'

export const PostgresState = ({children}) => {
    const initialState = {
        goods: [], 
        favourites: [],
        item: [],
        filterFunc: goods => goods,
        loading: false
    }

    const [state, dispatch] = useReducer(postgresReducer, initialState)

    const showLoader = () => dispatch({type: SHOW_LOADER})

    const fetchGoods = async (filterFunction = null, login = 'drakoper', id = -1) => {
        showLoader();
        const response = await fetch(`http://localhost:5001/goods`);
        const goods = await response.json();
        const response2 = await fetch(`http://localhost:5001/usersfavourite/${login}`);
        const favourites = await response2.json();
        if (goods) {
            let payload = Object.keys(goods).map(key => {
                return {
                    ...goods[key],
                    id: key
                }
            });
            console.log(filterFunction)
            if (filterFunction) {
                state.filterFunc = filterFunction
            }
            console.log(state.filterFunc)
            filterFunction = state.filterFunc
            payload = state.filterFunc(payload);
            let payload3 = payload;
            if (id !== -1) {
                payload3 = payload[id];
            }

            let payload2 = favourites;

            dispatch({
                type: FETCH_GOODS,
                payload,
                payload2,
                payload3,
                filterFunction
            });
        } else {
            dispatch({
                type: STOP_LOADER
            })
        }
    }

    return (
        <postgresContext.Provider value = {{
            showLoader, fetchGoods, 
            loading: state.loading, 
            favourites: state.favourites,
            item: state.item,
            filterFunc: state.filterFunc,
            goods: state.goods
        }}>
            {children}
        </postgresContext.Provider>
    )
}