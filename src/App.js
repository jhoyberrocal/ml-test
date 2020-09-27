import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Results from './views/Results';
import ProductDetails from './views/ProductDetails';
import SearchBox from './components/SearchBox/SearchBox';

function App() {
  return (
    <Router>
        <SearchBox />
        <main className="container">
            <Switch>
                <Route path="/items" exact>
                    <Results />
                </Route>
                <Route path="/items/:id" exact>
                    <ProductDetails />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </main>
    </Router>
  );
}

export default App;
