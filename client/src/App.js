import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import {Home} from './pages/Home'
import {Catalog} from './pages/Catalog'
import {Contacts} from './pages/Contacts'
import {Wishlist} from './pages/Wishlist'
import {Account} from './pages/Account'
import { Navbar } from './components/Navbar';
import { Item } from './pages/Item';
import { RegistrationPage } from './pages/RegistrationPage';
import { PostgresState } from './context/postgres/PostgresState';

function App() {
  return (
    <div className="App">
      <PostgresState>
        <BrowserRouter>
          <Navbar />
            <div className="container pt-4">
              <Switch>
                <Route path={'/'} exact component={Home} />
                <Route path={'/catalog'} exact component={Catalog} />
                <Route path={'/contacts'} exact component={Contacts} />
                <Route path={'/wishlist'} exact component={Wishlist} />
                <Route path={'/account'} exact component={Account} />
              </Switch>
                <Route path={'/item/:id'} exact component={Item}/>
                <Route path={'/registration'} exact component={RegistrationPage} />
            </div>
        </BrowserRouter>
      </PostgresState>
    </div>
  );
}

export default App;
