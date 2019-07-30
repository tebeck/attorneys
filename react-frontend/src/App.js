import React, {Component} from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './_helpers';
import { PrivateRoute, AdminRoute}  from './_helpers';
import Loadable from 'react-loadable'
import SearchComponent from './_components/appearances/SearchComponent';
import CreateComponent from './_components/appearances/CreateComponent';
import UpdateComponent from './_components/appearances/UpdateComponent';
import DeleteComponent from './_components/appearances/DeleteComponent';
import AddCardComponent from './_components/stripe/AddCardComponent';
import './_assets/css/ownstylesheet.scss';
import {url_backend} from './_helpers';
import LoaderAnimation from './_components/LoaderAnimation';


console.log(url_backend);

const Loader = x => Loadable({
  loading: () => <div className="centered"><LoaderAnimation /></div>,
  loader: x,
})


const GuestComponent = Loader(() => import('./_components/GuestComponent') )
const HomeComponent = Loader(() => import('./_components/HomeComponent') )
const DefineRoleComponent = Loader(() => import('./_components/DefineRoleComponent'))
const NotificationsComponents = Loader(()=> import('./_components/NotificationsComponent'))
const InfoComponent = Loader(()=> import('./_components/InfoComponent'))
const TermsComponent = Loader(()=> import('./_components/TermsComponent'))

// Users
const AuthenticateComponent = Loader(() => import('./_components/users/AuthenticateComponent') )
const RegisterComponent = Loader(() => import('./_components/users/RegisterComponent') )
// const RegisterSeekerComponent = Loader(() => import('./_components/users/RegisterSeekerComponent') )
// const RegisterAttorneyComponent = Loader(() => import('./_components/users/RegisterAttorneyComponent') )
const ProfileComponent = Loader(() => import('./_components/users/ProfileComponent') )

// Admin
const AdminComponent = Loader(() => import('./_components/admins/AdminComponent') )
const AdminPanelComponent = Loader(() => import('./_components/admins/AdminPanelComponent') )

// Appearances
const AppearancesComponent = Loader(() => import('./_components/appearances/AppearancesComponent') )
const AppearanceDetailComponent = Loader(() => import('./_components/appearances/AppearanceDetailComponent') )
const RequestsComponent = Loader(() => import('./_components/appearances/RequestsComponent') )
const VeredictComponent = Loader(() => import('./_components/appearances/VeredictComponent') )
const RateComponent = Loader(() => import('./_components/appearances/RateComponent') )

// Passrecovery
const RecoverPasswordComponent = Loader(() => import('./_components/passrecovery/RecoverPasswordComponent'))
const CreateNewPasswordComponent = Loader(() => import('./_components/passrecovery/CreateNewPasswordComponent'))


class App extends Component {

  constructor(props) {
    super(props)
    fetch(`${url_backend}`)
     .then( data => {return data.json().then( text=> console.log(text.stage) )} )
 

  }



  render() {

  return (
        <Router history={history}>
           <PrivateRoute exact path="/home" component={HomeComponent} />
           <PrivateRoute exact path="/createappearance" component={CreateComponent} />
           <PrivateRoute exact path="/deleteappearance" component={DeleteComponent} />
           <PrivateRoute exact path="/requests" component={RequestsComponent} />
           <PrivateRoute exact path="/notifications" component={NotificationsComponents} />
           <PrivateRoute exact path="/info" component={InfoComponent} />
           <PrivateRoute exact path="/appearances" component={AppearancesComponent} />
           <PrivateRoute exact path="/rate" component={RateComponent} />
           <PrivateRoute exact path="/appearancedetail" component={AppearanceDetailComponent} />
           <PrivateRoute exact path="/veredict" component={VeredictComponent} />
           <PrivateRoute exact path="/profile" component={ProfileComponent} />
           <PrivateRoute exact path="/findproduct" component={SearchComponent} />
           <PrivateRoute exact path="/addcard" component={AddCardComponent} />
           <PrivateRoute path="/updateproduct/" component={() => <UpdateComponent />} />

           <Route exact path="/" component={GuestComponent} />
           <Route exact path="/terms" component={TermsComponent} />
           <Route exact path="/authenticate" component={AuthenticateComponent} />
           <Route exact path="/definerole" component={DefineRoleComponent} />
           <Route path="/register" component={RegisterComponent} />
           <Route path="/admin" component={AdminComponent} />
           <AdminRoute path="/adminpanel" component={AdminPanelComponent} />
           <Route path="/recoverpassword" component={RecoverPasswordComponent} />
           <Route path="/createnewpassword" component={CreateNewPasswordComponent} />
        </Router>
    );
  }
}

export default App;
