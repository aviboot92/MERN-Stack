import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';
// Redux
import {Provider} from 'react-redux';
import store from './store';

import './App.css';

if(localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => {

    useEffect(() => {
       store.dispatch(loadUser());
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <NavBar/>
                    <Route exact path='/' component={Landing}/>
                    <section className='container'>
                        <Alert/>
                        <Switch>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/register' component={Register}/>
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
}

export default App;
