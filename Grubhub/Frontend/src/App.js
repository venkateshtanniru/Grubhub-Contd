import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import {BrowserRouter} from 'react-router-dom';
import MainRoutes from './components/Main';
import { Provider } from 'react-redux'
// import { createStore } from 'redux'
import promise from "redux-promise"
import reducers from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composePlugin(applyMiddleware(promise, thunk)))
// const store= createStore(reducers, applyMiddleware(thunk))



class App extends Component {
  render(){
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div className="App">
          <MainRoutes/>
      </div>
      </BrowserRouter>
      </Provider>


    )
  }
}

export default App;
