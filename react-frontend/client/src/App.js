import React, {Component} from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './_helpers';
import { PrivateRoute }  from './_helpers';
import Loadable from 'react-loadable'
import SearchComponent from './_components/products/SearchComponent';
import CreateComponent from './_components/products/CreateComponent';
import UpdateComponent from './_components/products/UpdateComponent';
import DeleteComponent from './_components/products/DeleteComponent';
import './assets/css/ownstylesheet.css';

const Loader = x => Loadable({
  loading: () => 'Cargando...',
  loader: x 
})

const HomeComponent = Loader(() => import('./_components/HomeComponent') )
const GuestComponent = Loader(() => import('./_components/GuestComponent') )
const LoginComponent = Loader(() => import('./_components/LoginComponent') )
const RegisterSeekerComponent = Loader(() => import('./_components/RegisterSeekerComponent') )
const RegisterAttorneyComponent = Loader(() => import('./_components/RegisterAttorneyComponent') )
const ProductsComponent = Loader(() => import('./_components/products/ProductsComponent') )

class App extends Component {

  render() {
    return (
      <div className="jumbotron">
      <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
              {alert.message &&
                  <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              <Router history={history}>
                  <div>
                      <PrivateRoute exact path="/" component={HomeComponent} />
                      <PrivateRoute exact path="/products" component={ProductsComponent} />
                      <PrivateRoute exact path="/createproduct" component={CreateComponent} />

                      <PrivateRoute exact path="/findproduct" component={SearchComponent} />
                      <PrivateRoute exact path="/deleteproduct" component={DeleteComponent} />
                      
                      <PrivateRoute path="/updateproduct/" component={
                        () => <UpdateComponent />
                      } />                        
                      <Route exact path="/guest" component={GuestComponent} />
                      <Route exact path="/login" component={LoginComponent} />
                      <Route path="/registerSeeker" component={RegisterSeekerComponent} />
                      <Route path="/registerAttorney" component={RegisterAttorneyComponent} />
                  </div>
              </Router>
          </div>
      </div>
  </div>
    );
  }
}

export default App;
