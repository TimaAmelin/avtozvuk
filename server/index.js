const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const passwordHash = require('password-hash');

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create account
app.post('/accounts', async(req,res) => {
    try {
        const {
            loginTrimmed,
            firstName,
            secondName,
            password
        } = req.body;
        
        const accountsWithTheSameLogin = await pool.query(
            'SELECT * FROM accounts WHERE login = $1',
            [loginTrimmed]
        );

        if(!accountsWithTheSameLogin.rows.length){
            const passwordHashed = passwordHash.generate(password);
            const newAccount = await pool.query(
                'INSERT INTO accounts (login, password, first_name, second_name) VALUES($1, $2, $3, $4) RETURNING *', 
                [loginTrimmed, passwordHashed, firstName, secondName]
                );
            
            res.json(newAccount.rows[0]);
        } else {
            res.json('Учетная запись с такой электронной почтой уже существует')
        }

    } catch (error) {
        console.error(error.message)
    }
});

//check login
app.get('/accounts/:loginTrimmed/:password', async(req,res) => {
    try {
        const {loginTrimmed, password} = req.params;

        const newAccount = await pool.query(
            'SELECT * FROM accounts WHERE login = $1',
            [loginTrimmed]
        );

        if (newAccount.rows.length) {
            const passwordHashed = newAccount.rows[0].password.replace(/ /g, "");
    
            const isPasswordTheSame = passwordHash.verify(password, passwordHashed);
    
            res.json(isPasswordTheSame);
        } else {
            res.json('noSuchAccount')
        }
    } catch (error) {
        console.error(error.message)
    }
});

//get information about user
app.get('/accounts/:loginTrimmed', async(req,res) => {
    try {
        const {loginTrimmed} = req.params;

        const newAccount = await pool.query(
            'SELECT * FROM accounts WHERE login = $1',
            [loginTrimmed]
        );

        if (newAccount.rows.length) {
            res.json(newAccount.rows[0]);
        } else {
            res.json('noSuchAccount');
        }
    } catch (error) {
        console.error(error.message)
    }
});

//change information about user
app.put('/accounts/:loginTrimmed', async(req,res) => {
    try {
        const {
            login,
            firstName,
            secondName,
            sex,
            birthDate,
            country,
            region,
            city,
            street,
            building,
            flat
        } = req.body;

        const updateAccount = await pool.query(
            'UPDATE accounts SET first_name = $2, second_name = $3, sex = $4, birth_date = $5, country = $6, region = $7, city = $8, street = $9, building = $10, flat = $11  WHERE login = $1 RETURNING *',
            [login, firstName, secondName, sex, birthDate, country, region, city, street, building, flat]
        );

        res.json(updateAccount.rows)
    } catch (error) {
        console.error(error.message)
    }
});

//delete account
app.delete('/accounts/:id', async(req,res) => {
    try {
        const {
            loginTrimmed
        } = req.body;
        const deleteTodo = await pool.query(
            'DELETE FROM accounts WHERE login = $1', 
            [loginTrimmed]
        );
        res.json('Учетная запись удалена');
    } catch (error) {
        console.log(error.message)
    }
});

//create good
app.post('/goods', async(req,res) => {
    try {
        const {
            name,
            description,
            imageName,
            category,
            priceDiler,
            priceOpt,
            priceRozn
        } = req.body;

        const newGood = await pool.query(
            'INSERT INTO goods (name, description, image_name, category, price_diler, price_opt, price_rozn) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
            [name, description, imageName, category, priceDiler, priceOpt, priceRozn]
        );
        
        res.json(newGood.rows[0]);

    } catch (error) {
        console.error(error.message)
    }
});

//get goods
app.get('/goods', async(req,res) => {
    console.log(req)
    try {
        const goods = await pool.query(
            'SELECT * FROM goods'
        );
        res.json(goods.rows);

    } catch (error) {
        console.error(error.message)
    }
});

//create userFavourite
app.post('/usersfavourite', async(req,res) => {
    try {
        const {
            login,
            id,
            addOrDelete
        } = req.body;

        const isAlready = await pool.query(
            'SELECT * FROM usersfavourite WHERE login = $1 and liked = $2',
            [login, id]
        );
        
        if(addOrDelete){
            if (!isAlready.rows.length) {
                const newUsersFavourite = await pool.query(
                    'INSERT INTO usersfavourite (login, liked) VALUES($1, $2) RETURNING *', 
                    [login, id]
                );
            
                res.json(newUsersFavourite.rows[0]);
            }
        } else {
            if (isAlready.rows.length) {
                const deleteTodo = await pool.query(
                    'DELETE FROM usersfavourite WHERE login = $1 and liked = $2', 
                    [login, id]
                );
                
                res.json('Удалено из избранных');
            }
        }

    } catch (error) {
        console.error(error.message)
    }
});

//get userFavourite
app.get('/usersfavourite/:login', async(req,res) => {
    const {
        login
    } = req.params;
    console.log(req)
    try {
        const userFavourite = await pool.query(
            'SELECT * FROM usersfavourite WHERE login = $1',
            [login]
        );

        let favourites = [];

        userFavourite.rows.map(row => {
            favourites.push(row.liked.trim())
        })
        
        res.json(favourites);

    } catch (error) {
        console.error(error.message)
    }
});

app.listen(5001, () => {
    console.log('server has started on port 5001');
});