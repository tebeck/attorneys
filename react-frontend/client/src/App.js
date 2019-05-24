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
import {url_backend} from './config.json';

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
const DefineRoleComponent = Loader(() => import('./_components/DefineRoleComponent'))
const RecoverPasswordComponent = Loader(() => import('./_components/RecoverPasswordComponent'))
const CreateNewPasswordComponent = Loader(() => import('./_components/CreateNewPasswordComponent'))


class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {};
  
    fetch(`${url_backend}`)
          .then( data => {return data.json().then(
            text=> console.log(text.stage) )} 
          )
          // rest of script

    }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-offset-6 col-md-6">
              {alert.message &&
                  <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              <Router history={history}>
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
                      <Route exact path="/definerole" component={DefineRoleComponent} />
                      <Route path="/registerSeeker" component={RegisterSeekerComponent} />
                      <Route path="/registerAttorney" component={RegisterAttorneyComponent} />
                      <Route path="/recoverpassword" component={RecoverPasswordComponent} />
                      <Route path="/createnewpassword" component={CreateNewPasswordComponent} />
              </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
