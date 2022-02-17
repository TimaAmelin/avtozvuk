import React, { Fragment, useContext, useEffect, useState, useRef } from 'react';
import { GoodsContainer } from '../components/GoodsContainer.js';
import { Loader } from '../components/Loader.js';
import { postgresContext } from '../context/postgres/postgresContext.js';
import { Form, Button, Overlay, Tooltip } from 'react-bootstrap';
import { checkLogin } from '../functions/checkLogin.js';

export const Catalog = () => {
    let {loading, goods, favourites, fetchGoods, filterfunction} = useContext(postgresContext);
    const [search, setSearch] = useState('');
    const [emptySearch, setEmptySearch] = useState(false);
    const target = useRef(null);
    
    let filter = goods => goods;

    const login = checkLogin(true, 'drakoper');
    
    useEffect(() => {
        fetchGoods(filterfunction, login)
        //eslint-disable-next-line
    }, []);
    return (
        <Fragment>
            <div className="catalog">
                <div className="categories mt-5 float-left">
                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group-vertical btn-group-lg mr-2" role="group" aria-label="First group">
                            <button type="button" className="btn categories-btn btn-secondary" onClick={() => {
                                filterfunction = goods => {
                                    const goodsUpdated =  goods.map(good => {
                                        if (good.category.trim() === 'FM-модуляторы'){
                                            return good;
                                        } else {
                                            return null;
                                        }
                                    });
        
                                    return goodsUpdated;
                                }
                                fetchGoods(filterfunction, login);
                            }
                            }>FM-модуляторы</button>
                            <button type="button" className="btn categories-btn btn-secondary" onClick={() => {
                                filterfunction = goods => {
                                    const goodsUpdated = goods.map(good => {
                                        if (good.category.trim() === 'Колонки'){
                                            return good;
                                        } else {
                                            return null;
                                        }
                                    });
        
                                    return goodsUpdated;
                                }
                                fetchGoods(filterfunction, login);
                            }
                            }
                            >Колонки</button>
                            <button type="button" className="btn categories-btn btn-secondary" onClick={() => {
                                filterfunction = goods => {
                                    const goodsUpdated = goods.map(good => {
                                        if (good.category.trim() === 'Генераторы'){
                                            return good;
                                        } else {
                                            return null;
                                        }
                                    });
        
                                    return goodsUpdated;
                                }
                                fetchGoods(filterfunction, login);
                            }
                            }
                            >Генераторы</button>
                            <button type="button" className="btn categories-btn btn-secondary" onClick={() => {
                                filterfunction = goods => {
                                    const goodsUpdated = goods.map(good => {
                                        if (good.category.trim() === 'Дистрибьюторы'){
                                            return good;
                                        } else {
                                            return null;
                                        }
                                    });
        
                                    return goodsUpdated;
                                }
                                fetchGoods(filterfunction, login);
                            }
                            }
                            >Дистрибьюторы</button>
                        </div>
                    </div>
                </div>
                <div className="search-holder float-left mt-5">
                    <Form className="search-form float-left">
                        <Form.Control 
                            type="search" 
                            placeholder="Поиск" 
                            className="rounded inner-shadow search" 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </Form> 
                    <Button variant="no" ref={target} className="rounded float-left d-flex search-btn button" onClick={() => {
                        if (search) {
                            if (search.trim()) {
                                filterfunction = goods => {
                                    const goodsUpdated = goods.map(good => {
                                        if (good.name.search(search.trim()) !== -1){
                                            return good;
                                        } else {
                                            return null;
                                        }
                                    });
        
                                    return goodsUpdated;
                                }
                                fetchGoods(filterfunction, login);
                            } else {
                                setEmptySearch(true);
                                setTimeout(() => {
                                    setEmptySearch(false);
                                }, 2000);
                            }
                            console.log(filter)
                        } else {
                            setEmptySearch(true);
                            setTimeout(() => {
                                setEmptySearch(false);
                            }, 2000);
                        }
                        console.log(filter)
                    }}>
                        Найти
                    </Button>
                    <Button variant="no" className="rounded float-left d-flex clear-search-btn button" onClick={() => {
                        filter = goods => goods;
                        fetchGoods(filter, login);
                        setSearch('');
                    }}>
                        Отменить
                    </Button>
                    <Overlay target={target.current} show={emptySearch} placement="right">
                        {(props) => {
                            return(
                                <Tooltip id="overlay-example" {...props}>
                                    <strong>Введите поисковой запрос </strong><br/>
                                    Задан пустой поисковый запрос
                                </Tooltip>
                            )
                        }}
                    </Overlay>
                </div>
                <GoodsContainer goods={goods} favourites={favourites} filter={filter}/>
            </div>
            {
                loading 
                ? <Loader />
                : null
            }
        </Fragment>
        
    )
}