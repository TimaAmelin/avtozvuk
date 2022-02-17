import React, { useContext, useEffect, Fragment } from 'react';
import { Button, Card } from 'react-bootstrap';
import { postgresContext } from '../context/postgres/postgresContext';
import { Loader } from '../components/Loader';
import { checkLogin } from '../functions/checkLogin';
import { checkLast } from '../functions/checkLast';

export const Item = () => {
    let {loading, item, goods, favourites, fetchGoods} = useContext(postgresContext);
    const id = window.location.pathname.toString().slice(6);
    const login = checkLogin(true, 'drakoper');
    
    useEffect(() => {
        if (login) {
            fetchGoods(item => item, login, id)
        } else {
            fetchGoods(item => item, 'drakoper', id)
        }
        console.log(goods)
        //eslint-disable-next-line
    }, []);

    const last = checkLast(true, 0);
    const lastList = last.map(item => {
        if (goods[0]) {
            if (item && item != id){
                console.log(goods[item])
                
                return(
                    <Card key={goods[item].id} style={{ width: '12rem' }} className="card last-seen-card">
                        <div className="card-image-holder">
                            <img src={'../goods/' + goods[item].image_name} className="image"/>
                            {console.log(goods[item].image_name)}
                        </div>
                        <Card.Body>
                            <Card.Title>
                                <a href="/item" className="card-title">
                                    {goods[item].name}
                                </a>
                            </Card.Title>
                            <Card.Text className="card-price">
                                <div className="price-holder d-flex justify-content-start">
                                    {goods[item].price_rozn + 'Руб'}
                                </div>
                            </Card.Text>
                            {!(favourites.indexOf(goods[item].id) == -1) ? 
                                <Button variant="no" className="favourite-button button mt-2" onClick={() => {
                                    onLike(goods[item].id, false);
                                    if (login) {
                                        fetchGoods(item => item, login, id)
                                    } else {
                                        fetchGoods(item => item, 'drakoper', id)
                                    }
                                }}>Удалить из избранного</Button> : 
                                <Button variant="no" className="favourite-button button mt-2" onClick={() => {
                                    onLike(goods[item].id, true);
                                    if (login) {
                                        fetchGoods(item => item, login, id)
                                    } else {
                                        fetchGoods(item => item, 'drakoper', id)
                                    }
                                }}>Добавить в избранное</Button> 
                            }
                        </Card.Body>
                    </Card>
                )
            }
        }
        

    })

    const onLike = async (id) => {
        const login = checkLogin(true, 'drakoper');
        if (login !== 'drakoper') {
            if (favourites.indexOf(Number(id)) == -1) {
                try {
                    const body = {
                        login,
                        id
                    };
            
                    const response = await fetch(
                        'http://localhost:5001/usersfavourite',{
                        method: 'POST',
                        headers: {'content-type': 'application/json'},
                        body: JSON.stringify(body)
                    });
            
                    const jsonData = await response.json();
                    if (true) {
                        favourites.push(Number(id).toString());
                    } else {
                        favourites.splice(favourites.indexOf(Number(id)), 1)
                    }
                } catch (error) {
                    console.error(error.message)
                }
            }
        } else {
            alert('log in please');
        }
    }

    if (last) {
        if (item.image_name) {
            return (
                <Fragment>
                    {loading
                    ? <Loader />
                    :   <div>
                            <div className="item d-flex justify-content-between">
                                <div className="item-image-wrapper mt-5 float-left">
                                    <img src={'../goods/' + item.image_name} className="d-block item-image"/>
                                </div>
                                <div className="options mt-5 float-left">
                                    <div className="add-to-cart-wrapper shadow-lg p-5">
                                        <h1 >{item.price_rozn + 'руб.'}</h1>
                                        <Button variant="no" className="rounded disabled-button mt-3" size="lg" onClick={() => {
                                            }
                                            }>
                                                Добавить в корзину
                                        </Button>
                                        <Button variant="no" className="rounded button mt-3" onClick={() => {
                                            onLike(id)
                                            }
                                            }>
                                                Добавить в избранное
                                        </Button>
                                        <div className="item-specifications mt-5 float-up">
                                            <h5>
                                                {item.description}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="last-container">
                                <h3>Недавно просмотренные</h3>
                                {lastList}
                            </div>
                        </div>
                    }
                </Fragment>
            )
        } else {
            return null
        }
    }
    
    
}