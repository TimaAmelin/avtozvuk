import React, { useContext } from 'react';
import { Card, Button, Pagination } from 'react-bootstrap';
import { checkPage } from '../functions/checkPage.js'
import { checkLogin } from '../functions/checkLogin.js';
import { checkLast } from '../functions/checkLast.js';
import { postgresContext } from '../context/postgres/postgresContext.js';

export const GoodsContainer = ({goods, favourites}) => {
    let {fetchGoods} = useContext(postgresContext);
    const login = checkLogin(true, 'drakoper');
    
    const page = checkPage(true, null);
    let pagesNumber = goods.length / 25 + 10;

    const onLike = async (id, addOrDelete) => {
        const login = checkLogin(true, 'drakoper');
        if (login !== 'drakoper') {
            if (favourites.indexOf(Number(id)) === -1) {
                try {
                    const body = {
                        login,
                        id,
                        addOrDelete
                    };
            
                    const response = await fetch(
                        'http://localhost:5001/usersfavourite',{
                        method: 'POST',
                        headers: {'content-type': 'application/json'},
                        body: JSON.stringify(body)
                    });

                    if (addOrDelete) {
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

    if (goods) {
        if (page) {
            let pages = [];
            const goodsList = goods.map(good => {
                if (good){
                    if (good.id >= (page - 1) * 25 && good.id <= page * 25 - 1) {
                        return(
                            <Card key={good.id} style={{ width: '12rem' }} className="card">
                                <div className="card-image-holder">
                                    <img src={'goods/' + good.image_name} className="image"/>
                                </div>
                                <Card.Body>
                                    <Card.Title>
                                        <Button variant="light" className="rounded mt-3" onClick={() => {
                                            checkLast(false, good.id)
                                            window.location = `/item/${good.id}`;
                                        }}>
                                            {good.name}
                                        </Button>
                                    </Card.Title>
                                    <div className="price-holder">
                                        <Card.Text className="card-price">
                                            {good.price_rozn + 'Руб'}
                                        </Card.Text>
                                    </div>
                                    {!(favourites.indexOf(good.id) == -1) ? 
                                    <Button variant="no" className="favourite-button button mt-2" onClick={() => {
                                        onLike(good.id, false);
                                        fetchGoods(null, login);
                                    }}>Удалить из избранного</Button> : 
                                    <Button variant="no" className="favourite-button button mt-2" onClick={() => {
                                        onLike(good.id, true);
                                        fetchGoods(null, login);
                                    }}>Добавить в избранное</Button> 
                                    }
                                </Card.Body>
                            </Card>
                        )
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            })
            for (let number = 1; number <= pagesNumber; number++) {
                pages.push(
                    <Pagination.Item className="red" key={number} active={number === page} onClick={e => {
                        checkPage(false, number);
                        window.location = "/catalog";
                    }}>
                        {number}
                    </Pagination.Item>,
                );
            }
            
            return(
                <div className="catalog">
                    <div className="pagination-holder float-left mt-3">
                        <Pagination>{pages}</Pagination>
                    </div>
                    <div className="goods-container float-left d-flex">
                        <div className="row justify-content-center justify-content-sm-between">
                            <div className="col-12 col-sm-6 col-md-9 col-xl-10">
                                <div className="container">
                                    <div className="row no-gutters goods-wrapper justify-content-center">
                                        {
                                            goodsList
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            const page = checkPage(false, 1);
            let pages = [];
            const goodsList = goods.map(good => {
                if (good){
                    if (good.id >= (page - 1) * 25 && good.id <= page * 25 - 1) {
                        return(
                            <Card key={good.id} style={{ width: '12rem' }} className="card">
                                <div className="card-image-holder">
                                    <img src={'goods/' + good.image_name} className="image"/>
                                </div>
                                <Card.Body>
                                    <Card.Title>
                                        <a href="/item" className="card-title">
                                            {good.name}
                                        </a>
                                    </Card.Title>
                                    <Card.Text className="card-price">
                                        <div className="price-holder d-flex justify-content-start">
                                            {good.price_rozn + 'Руб'}
                                        </div>
                                    </Card.Text>
                                    <Button variant="no" className="favourite-button button mt-2" onClick={() => {
                                        
                                        onLike(good.id, true);
                                        
                                        //window.location="/catalog";
                                    }}>Добавить в избранное</Button>
                                </Card.Body>
                            </Card>
                        )
                    }
                }
            })
            for (let number = 1; number <= pagesNumber; number++) {
                pages.push(
                    <Pagination.Item className="red" key={number} active={number === 1} onClick={e => {
                        checkPage(false, number);
                        window.location = "/catalog";
                    }}>
                        {number}
                    </Pagination.Item>,
                );
            }
            
            return(
                <div className="catalog">
                    <div className="pagination-holder float-left mt-3">
                        <Pagination>{pages}</Pagination>
                    </div>
                    <div className="goods-container float-left d-flex">
                        <div className="row justify-content-center justify-content-sm-between">
                            <div className="col-12 col-sm-6 col-md-9 col-xl-10">
                                <div className="container">
                                    <div className="row no-gutters goods-wrapper justify-content-center">
                                        {
                                            goodsList
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div className="mt-5">
                <center>
                    <h1>Что-то пошло не так</h1>
                    <h5>Попробуйте зайти позже</h5>
                </center>
            </div>
        )
    }
    
}