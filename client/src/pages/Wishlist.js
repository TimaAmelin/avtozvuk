import React, { Fragment, useContext, useEffect, useState, useRef } from 'react';
import { GoodsContainer } from '../components/GoodsContainer.js';
import { Loader } from '../components/Loader.js';
import { postgresContext } from '../context/postgres/postgresContext.js';
import { Form, Button, Overlay, Tooltip } from 'react-bootstrap';
import { checkLogin } from '../functions/checkLogin.js';

export const Wishlist = () => {
    let {loading, goods, favourites, fetchGoods} = useContext(postgresContext);
    const [search, setSearch] = useState('');
    const [emptySearch, setEmptySearch] = useState(false);
    const target = useRef(null);

    const login = checkLogin(true, 'drakoper');
    
    const filter = goods => {
            const goodsUpdated = goods.map(good => {
                if(good) {
                    if (favourites.indexOf(good.id) !== -1){
                        return good;
                    } else {
                        return null;
                    }
                }
            });

            return goodsUpdated;
    }
    
    useEffect(() => {
        fetchGoods(goods => goods, login);
        //eslint-disable-next-line
    }, []);

    goods = filter(goods);
    return (
        <Fragment>
            <div className="catalog">
                <div className="categories mt-5 float-left">
                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group-vertical btn-group-lg mr-2" role="group" aria-label="First group">
                            <button type="button" className="btn categories-btn btn-secondary" onClick={() => {
                                const filter = goods => {
                                    const goodsUpdated = goods.map(good => {
                                        if (good.category.trim() === 'FM-модуляторы'){
                                            return good;
                                        } else {
                                            return null;
                                        }
                                    });
        
                                    return goodsUpdated;
                                }
                                fetchGoods(filter, login);
                            }
                            }>FM-модуляторы</button>
                            <button type="button" className="btn categories-btn btn-secondary" onClick={() => {
                                const filter = goods => {
                                    const goodsUpdated = goods.map(good => {
                                        if (good.category.trim() === 'не FM-модуляторы'){
                                            return good;
                                        } else {
                                            return null;
                                        }
                                    });
        
                                    return goodsUpdated;
                                }
                                fetchGoods(filter, login);
                            }
                            }
                            >не FM-модуляторы</button>
                            <button type="button" className="btn categories-btn btn-secondary" onClick={() => {
                                const filter = goods => {
                                    const goodsUpdated = goods.map(good => {
                                        if (good.category.trim() === 'не FM-модуляторы'){
                                            return good;
                                        } else {
                                            return null;
                                        }
                                    });
        
                                    return goodsUpdated;
                                }
                                fetchGoods(filter, login);
                            }
                            }
                            >не FM-модуляторы</button>
                            <button type="button" className="btn categories-btn btn-secondary" onClick={() => {
                                const filter = goods => {
                                    const goodsUpdated = goods.map(good => {
                                        if (good.category.trim() === 'не FM-модуляторы'){
                                            return good;
                                        } else {
                                            return null;
                                        }
                                    });
        
                                    return goodsUpdated;
                                }
                                fetchGoods(filter, login);
                            }
                            }
                            >не FM-модуляторы</button>
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
                                const filter = goods => {
                                    const goodsUpdated =  goods.map(good => {
                                        if (good.name.search(search.trim()) !== -1){
                                            return good;
                                        } else {
                                            return null;
                                        }
                                    });
        
                                    return goodsUpdated;
                                }
                                fetchGoods(filter, login);
                            } else {
                                setEmptySearch(true);
                                setTimeout(() => {
                                    setEmptySearch(false);
                                }, 2000);
                            }
                        } else {
                            setEmptySearch(true);
                            setTimeout(() => {
                                setEmptySearch(false);
                            }, 2000);
                        }
                    }}>
                        Найти
                    </Button>
                    <Button variant="no" className="rounded float-left d-flex clear-search-btn button" onClick={() => {
                        fetchGoods(goods => goods, login);
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
                <GoodsContainer goods={goods} favourites={favourites} addOrDelete={false}/>
            </div>
            {loading 
            ? <Loader />
            : null
            }
        </Fragment>
        
    )
}