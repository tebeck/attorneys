import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import Cookies from 'js-cookie'
// import landing0 from '../_assets/img/landing/landing_0.png'
// import landing1 from '../_assets/img/landing/landing_1.png'
import { userServices } from '../_services/user.service'
import manWalkingImage from '../_assets/img/landing/man_walking.png'
import solutionImage from '../_assets/img/landing/landing_oursolutions.png'
import landing_features_01 from '../_assets/img/landing/landing_features_01.png'
import landing_features_02 from '../_assets/img/landing/landing_features_02.png'
import landing_features_03 from '../_assets/img/landing/landing_features_03.png'
import landing_features_04 from '../_assets/img/landing/landing_features_04.png'
import landing_instagram from '../_assets/img/landing/landing_instagram.png'
import landing_youtube from '../_assets/img/landing/landing_youtube.png'
import landing_twitter from '../_assets/img/landing/landing_twitter.png'
import logo from '../_assets/img/landing/logo.png'

import registerAsImage from '../_assets/img/landing/landing_register.png'
import HomeSlider from './sliders/HomeSlider'
import SolutionsSlider from './sliders/SolutionsSlider'


const validate = values => {
  const errors = {}

  if(!values.email){
    errors.email = 'Insert an email'
  }
  if(!values.password) {
    errors.password = 'Insert a password'
  }

  return errors;
}



export default class HomeComponent extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      errors: {}
    };

    this.handleShow = () => {
      this.setState({ show: true });
    };

    this.handleHide = () => {
      this.setState({ show: false });
    };




  }


  componentDidMount(){
      userServices.getProfile()
       .then(res => {
         if(res.data == null){
            console.log("token expiraado")
            Cookies.remove('esquired');
         } else {
            console.log("usuario valido")
            this.setState({
            loggedIn: true,
            isAttorney: Cookies.getJSON('esquired').isAttorney,
            isSeeker: Cookies.getJSON('esquired').isSeeker,
            onHold: Cookies.getJSON('esquired').onHold,
            user: Cookies.getJSON('esquired').user,
            email: Cookies.getJSON('esquired').email
           })
         }
       })
  }

    handleChange = ({target}) =>{
    this.setState({
      [target.name]: target.value
    })
  }


    handleSubmit = (e) =>{
    e.preventDefault()

    const {errors, ...noErrors} = this.state // Destructuring...
    const result = validate(noErrors)
    console.log(result)
    this.setState({errors: result})
    if(!Object.keys(result).length) {
      console.log(noErrors)
      userServices.authenticate(noErrors)
        .then(data => {
          if (data.status !== 200) {
            console.log(data.message)
            this.setState({
              errlogin: data.message
             })
           } else {
             window.location.assign('/home')
           }
          }
      )

    } else {
      this.setState({ errors: result })
    }

  }



	render() {

    const recoverpass = {
      pathname: "/recoverpassword",
      fromDesktop: true
    };

    const aoa = {
      pathname: "/register",
      backhome: true,
      state: { isSeeker: true }
    }

    const aor = {
      pathname: "/register",
      backhome: true,
      state: { isAttorney: true }
    }

    const {errors, errlogin} = this.state
		return (
      <div>

          <div className="navbar header-comp">
            <Link to="/"><i className="fas fa-bars green d-none"></i></Link>
              <div className="logo"><a href="/"><img src={logo} alt="esquired" /></a></div>
              { !this.state.loggedIn ?
                <Popup trigger={<Link to="/"><i className="fas fa-lg fa-user green"></i></Link>} position="left top">
                  <div className="container popup-desktop"><br/>
                    <h4>Log In into your account</h4><br/>
                    <form onSubmit={this.handleSubmit}>

                    <div className={errlogin ? 'display' : 'hide'}>
                    <div className="alert alert-danger" role="alert" style={{fontSize: "11px"}}>{this.state.errlogin}</div></div>
                      <input className="form-control" type="text" name="email" onChange={this.handleChange} placeholder="User" ></input>
                      {errors.email && <div style={{fontSize: "15px", padding: "1px", margin: "0px",color:"red"}} >{errors.email}</div>}
                      <input className="form-control" type="password" name="password" onChange={this.handleChange} placeholder="Password"></input>
                      {errors.password && <div style={{fontSize: "15px", padding: "1px", margin: "0px",color:"red"}} >{errors.password}</div>}
                      <small><Link to={recoverpass} style={{display: "block",textAlign:"right", color: "#4a4a4a"}} >Forgot your Password?</Link></small><br />
                      <input className="formbutton" type="submit" value="Log In" />
                    </form><br/>

                    <p>Don't have an account?<Link to="/definerole"> Sign Up</Link></p><br/>
                  </div>
                </Popup>
                : <div>Go home: <Link to="/home">{this.state.email}</Link></div>}
          </div>
          <div className="background-esquired">
            <div className="flex-space-around margin-sides">
            <div className="row">
               <HomeSlider /> 
             </div>
            </div>
          </div>
          <div className="solutions">
            <h2><b>Our Solutions</b></h2>
            <div className="row padding-bottom-guest">
            <div className="col-sm-12">
            
            <SolutionsSlider />
            <div className="desktop">
              <div className="solutions-square-item">
              <div className="solutions-square">
                <div className="solution-image" style={{ backgroundImage: "url(" + solutionImage +")" }}></div>
                <div className="solution-title">Lorem Ipsum Title</div>
                <div className="solution-desc">Lorem ipsum dolor sit amet, conse ctetuer adipiscing enean commodo ligula eget dolor enean massa um sociis natoque penatibus et magnis. </div>
              </div>
              </div>
              <div className="solutions-square-item">
              <div className="solutions-square">
                <div className="solution-image" style={{ backgroundImage: "url(" + solutionImage +")" }}></div>
                <div className="solution-title">Lorem Ipsum Title</div>
                <div className="solution-desc">Lorem ipsum dolor sit amet, conse ctetuer adipiscing enean commodo ligula eget dolor enean massa um sociis natoque penatibus et magnis. </div>
              </div>
              </div>
              <div className="solutions-square-item">
              <div className="solutions-square">
                <div className="solution-image" style={{ backgroundImage: "url(" + solutionImage +")" }}></div>
                <div className="solution-title">Lorem Ipsum Title</div>
                <div className="solution-desc">Lorem ipsum dolor sit amet, conse ctetuer adipiscing enean commodo ligula eget dolor enean massa um sociis natoque penatibus et magnis. </div>
              </div>
              </div>
              </div>
            </div>
          </div>
          </div>
          <div className="features">
            <h3><b>Features</b></h3>
           <div className="padding-bottom-guest flex-space-around">
           <div className="row">

            <div className="col-sm-12 col-md-6 col-lg-3">
             <div className="features-square">
               <img src={landing_features_01} alt="landing_features_01" />
               <h5>Lorem ipsum dispusm</h5>
               <p>Lorem ipsum dolor sit amet, conse cteteur adipsing</p>
             </div>
             </div>
              <div className="col-sm-12 col-md-6 col-lg-3">
             <div className="features-square">
               <img src={landing_features_02} alt="landing_features_02" />
               <h5>Lorem ipsum dispusm</h5>
               <p>Lorem ipsum dolor sit amet, conse cteteur adipsing</p>
             </div>
             </div>
              <div className="col-sm-12 col-md-6 col-lg-3">
             <div className="features-square">
               <img src={landing_features_03} alt="landing_features_03" />
               <h5>Lorem ipsum dispusm</h5>
               <p>Lorem ipsum dolor sit amet, conse cteteur adipsing</p>
             </div>
             </div>
              <div className="col-sm-12 col-md-6 col-lg-3">
             <div className="features-square">
               <img src={landing_features_04} alt="landing_features_04" />
               <h5>Lorem ipsum dispusm</h5>
               <p>Lorem ipsum dolor sit amet, conse cteteur adipsing </p>
             </div>
             </div>
             </div>
           </div>
          </div>
          <div className="registeras">
            <h3><b>Register now as:</b></h3>
            <div className="padding-bottom-guest">
              <div className="registeras-square">
                <img className="register-as-image" alt="esquired-register" src={registerAsImage} />
              </div>
              <Link className="link-button" to={aor}>Attorney of Record</Link>
              <Link className="link-button" to={aoa}>Appearing Attorney</Link>
            </div>
          </div>
          <div className="footer-guest">
            <div className="logo"><a href="/"><img src={logo} alt="esquired" /></a></div>
              <img className="footer-shape" src={landing_instagram} alt=""/>
              <img className="footer-shape" src={landing_youtube} alt=""/>
              <img className="footer-shape" src={landing_twitter} alt=""/>
              <Link style={{padding:"40px",display: "block",textAlign: "right"}} to="/terms">Terms & Conditions</Link>
          </div>
      </div>
		);
	}
}


export { HomeComponent };
