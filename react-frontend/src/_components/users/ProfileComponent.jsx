import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  { Tabs, Tab } from 'react-bootstrap';
import {userServices, stripeService} from '../../_services';
import Header from '../HeaderComponent';
import uploadImg from '../../_assets/img/upload_picture.png'
import Cookies from 'js-cookie';
import backbutton from '../../_assets/img/btnback.png'
import editPhotoImg from '../../_assets/img/btn_editphoto.png'
import LoaderAnimation from '../LoaderAnimation';
import Modal from 'react-awesome-modal';
import calendarImg from '../../_assets/img/appearance/appearance_calendar.png'
import Moment from 'react-moment';


import MasterCard from '../../_assets/img/cards/MasterCard.png'
import Visa from '../../_assets/img/cards/Visa.png'
import American from '../../_assets/img/cards/American.png'


export default class ProfileComponent extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'personalinfo',
      notification: "",
      firstName: "",
      lastName: "",
      email:"",
      password:"",
      firmName: "",
      policy: "",
      officePhone: "",
      mobilePhone: "",
      streetAddrOne: "",
      showImage:true,
      image:"",
      showLoader: false,
      transactions: [],
      accStripeLink: "https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://esquired-frontend.herokuapp.com/profile&client_id=ca_FUpj42uM1o663skKoNLaIsfCqIgvJgx0"
    };

    


  }

  componentWillMount(){
    userServices.getProfile()
      .then(data => this.setState({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        firmName: data.data.firmName,
        stateBar: data.data.stateBar,
        officePhone: data.data.officePhone,
        mobilePhone: data.data.mobilePhone,
        email: data.data.email,
        profilePicture: data.data.profilePicture,
        password: data.data.password,
        _userId: data.data._id,
        notification: data.data.notification,
        policy: data.data.policy,
        streetAddrOne: data.data.mailingAddress[0].streetAddrOne,
        image: data.data.profilePicture,
        stripe_user_id: data.data.stripe_user_id,
        stripe_customer_id: data.data.stripe_customer_id,
        transactions: data.data.transactions,
        data: data.data
        
        })

      )


      stripeService.retriveCustomer(this.state.stripe_customer_id)
        .then(customer => this.setState({
          customer: customer
        }))

        

      this.handleChange = this.handleChange.bind(this); // Bind boolean checkbox value.
  }





  fileSelectedHandler = ({target}) => {
    const newForm = new FormData();
    if(target.value !== ""){

     newForm.append('avatar',  target.files[0] , target.files[0].name)

      userServices.upload(newForm)
      .then(data => {
         this.setState({
           image: data.data.location,
           profilePicture: data.data.location
          })
      })

    this.setState({
      profilePicture: URL.createObjectURL(target.files[0]),
      showImage: true
    })

  } else {
    console.log("No image selected")
  }

  }


  handleAccSubmit = (e) =>{
    e.preventDefault()
    this.setState({
      showLoader: true
    })
     const {...noErrors} = this.state // Destructuring...
     const result = validate(noErrors)
     this.setState({errors: result})
     if(!Object.keys(result).length) {
      setTimeout(() => userServices.updateAccountInfo(noErrors).then( res => { 
          alert(res) 
          this.setState({
            showLoader: false
          })
        }), 1200)
     } else {
        this.setState({
            errors: result,
            showLoader: false
        })
     }
    
  }

  handleProfSubmit = (e) =>{
   e.preventDefault();
     const {...noErrors} = this.state // Destructuring...
     // const result = validateProf(noErrors)
     // this.setState({errors: result})
     
     // if(!Object.keys(result).length) {
        userServices.updateProfInfo(noErrors).then(
          res =>{
           alert(res)
          }
        )
     // } 
     // console.log(result)
  }

  handleAttorney = () =>{

   let body = {
     userId: this.state._userId
   }

    userServices.makeAttorney(body)
      .then(res => {
        if (res.state !== 200) {
          
      } else {
          
          let token = Cookies.getJSON('esquired').token;
          Cookies.set('esquired', {token: token, user: res.data.firstName, email: res.data.email, isAttorney: true, isSeeker: true,onHold: false}, { path: '' })   
     } 
   })
  }
  
  handleSeeker = () =>{

   let body = {
     userId: this.state._userId
   }

    userServices.makeSeeker(body)
      .then(res => {
        if (res.state !== 200) {
          

      } else {
          
          let token = Cookies.getJSON('esquired').token;
          Cookies.set('esquired', {token: token, user: res.data.firstName, email: res.data.email, isAttorney: true, isSeeker: true, onHold: true}, { path: '' })   
          alert("Your profile will be in revision. We will notify you when your Appearing attorney profile be accepted")
     } 
   })
  }

    handleLogout = () =>{
    Cookies.remove('esquired');
    window.location.assign('/home');

  }


  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  
  }


  changeDefaultCard = (s) => {
    let body = {
      defaultCard: s.id
    }
    stripeService.setDefaultCard(body)

      .then(this.openModal())
  }

  openModal()  {this.setState({visible : true})}
  closeModal()  {window.location.assign('/profile')}

	render() {

   const {showLoader, customer, stripe_user_id,accStripeLink} = this.state
   
  if(showLoader){
  return (
      <div className="centered"><LoaderAnimation /></div>
  )
  }
		return (
      <div>
        <Header guest="1" />
          <div className="container main-body">
  				  <Link style={{color: "black"}} to="/home">
            <img style={{marginBottom: "11px"}} width="16px" src={backbutton} alt="esquired" />
            <h3 style={{display: "inline"}  }> Profile</h3></Link>
          <div className="" style={{flexWrap: "none",alignItems: "center",justifyContent: "center"}}>
            
            <Modal 
              visible={this.state.visible}
              width="400"
              height="220"
              effect="fadeInDown"
              onClickAway={() => this.closeModal()}>
              <div className="modalRequestHead">
                <h5>Your Credit Card has been <br/>changed successfully!</h5>
                <button onClick={() => this.closeModal()}  style={{marginTop: "30px"}} className="btn btn-lg btn-block btn-primary link-button">Done</button> 
              </div>
         
            </Modal>

            <Tabs 
              id="controlled-tab-example"
              activeKey={this.state.key}
              onSelect={key => this.setState({ key })}
              className="tabs-control"
            >
             <Tab eventKey="personalinfo" title="Account info">
               
               <br />
                <div className="text-center">
                   <label className="uploadLabel" htmlFor="avatar">
                     { this.state.profilePicture ? 
                       <div>
                        <img alt="editimg" className="edit-photo-img-upl" src={editPhotoImg} />
                        <div className="profile-picture-p">
                          <img  alt="avatar" src={this.state.profilePicture} />
                        </div>
                       </div>
                       : 
                       <div>
                         <img alt="editimg" className="edit-photo-img-up" src={editPhotoImg} />
                         <img src={uploadImg} className="profileimgupload" alt="profileImg" /><br/><br/>Upload Profile Picture<br />
                       </div> }
                   </label>
                   <input id="avatar" type="file" className="inputfile" name="avatar" onChange={this.fileSelectedHandler} /><br /><br />    
                </div>


        <form onSubmit={this.handleAccSubmit}>
          <input className="form-control" type="hidden" name="avatar" value={this.state.image}></input>
          <div className="form-group">
            <label htmlFor="firstName" className="profileInputsTitle">First Name</label>
            <input id="firstName" name="firstName" className="form-control bigInput" value={this.state.firstName} placeholder={this.state.firstName} onChange={this.handleChange} type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="profileInputsTitle">Last Name</label>
            <input id="lastName" name="lastName" className="form-control bigInput" value={this.state.lastName} placeholder={this.state.lastName} onChange={this.handleChange} type="text" />
          </div>

          <p className="p-profile">Account info</p>
          <input disabled className="form-control bigInput" name="email"       type="email"    placeholder={this.state.email} onChange={this.handleChange} value={this.state.email} />
          <input className="form-control bigInput" name="password"    type="password" placeholder="Old Password"         onChange={this.handleChange} />
          <input className="form-control bigInput" name="newpassword" type="password" placeholder="New Password"     onChange={this.handleChange} />
          <input className="form-control bigInput" name="confirm"     type="password" placeholder="Confirm"          onChange={this.handleChange} />
          
          
          <p className="p-profile">Notifications</p>
          <div className="form-check form-check-inline">
           <input className="form-check-input" name="notification" type="checkbox" id="notification" checked={this.state.notification} onChange={this.handleChange } />
           <label className="form-check-label" htmlFor="notification">Email</label>
          </div><br /><br />


  {customer && customer.sources ? 
    <div>
    {customer.sources.data.map(s=>
         s.id === customer.default_source ? 
          <div key={s.id}>
          <div className="flex-space-between creditCardBox form-control bigInput lh">
            <div className="flex-grow ">Default Card:</div>
            <div>{s.brand === "Visa" ? <img className="cardLogo" src={Visa} alt="card" />: 
             s.brand === "MasterCard" ? <img className="cardLogo" src={MasterCard} alt="card" />: 
             s.brand === "American" ? <img className="cardLogo" src={American} alt="card" /> : 
             <div>{s.brand}</div> }</div>
            <div>XXXX-XXXX-XXXX-{s.last4}</div>
          </div><br/>
          </div> 
          : 
          <div onClick={this.changeDefaultCard.bind(this,s)} key={s.id} className="flex-space-between creditCardBoxActive lh">
            <div className="flex-grow">Change card:</div>
            {s.brand === "Visa" ? <div>{<img className="cardLogo" src={Visa} alt="card" />}</div>: 
             s.brand === "MasterCard" ? <div>{<img className="cardLogo" src={MasterCard} alt="card" />}</div>: 
             s.brand === "American" ? <div>{<img className="cardLogo" src={American} alt="card" />}</div>: 
             <div>{s.brand}</div> }
            <div>XXXX-XXXX-XXXX-{s.last4}</div>
          </div>
    )}<br/>
    </div> : null }

  {
    stripe_user_id && Cookies.getJSON('esquired').isAttorney ? 
    <div className="stripebutton">
     <Link className="button--inverse bg-green-color" to="/addcard">Add Credit Card</Link>
    </div> 
    : !stripe_user_id ?
    <div className="stripebutton">
      <a href={accStripeLink}> <span className="button--inverse">Connect with Stripe</span>
      </a>
    </div>
  : null}

          <Link className="link-profile link-delete" to="/">Delete Account</Link><br /> 
          
          { !Cookies.getJSON('esquired').isAttorney ? <button type="button" className="btn btn-block btn-outline-secondary" onClick={this.handleAttorney}>Be Attorney Of Record</button> : null }<br/>
          { !Cookies.getJSON('esquired').isSeeker ? <button type="button" className="btn btn-block btn-outline-secondary" onClick={this.handleSeeker}>Be Appearing Attorney</button> : null }<br/>

          <input className="btn btn-block btn-outline-primary btn-profile" style={{marginTop: "5px"}} type="submit" value="Save" />
        </form><br/><br/>
        <button className="btn btn-block logoutprofile" onClick={this.handleLogout}>Log out</button>

        <br/><br/>
      </Tab>
      <Tab eventKey="professionalinfo" title="Professional info">
        <form onSubmit={this.handleProfSubmit}>
          <div className="form-group">
            <label htmlFor="firmName" className="profileInputsTitle">Firm Name</label>
            <input id="firmName" name="firmName" className="form-control bigInput" value={this.state.firmName} placeholder={this.state.firmName} onChange={this.handleChange} type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="officePhone" className="profileInputsTitle">Office Phone</label>
            <input id="officePhone" name="officePhone" className="form-control bigInput" value={this.state.officePhone} placeholder={this.state.officePhone} onChange={this.handleChange} type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="mobilePhone" className="profileInputsTitle">Mobile Phone</label>
            <input id="mobilePhone" name="mobilePhone" className="form-control bigInput" value={this.state.mobilePhone} placeholder={this.state.mobilePhone} onChange={this.handleChange} type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="streetAddrOne" className="profileInputsTitle">Street Address</label>
            <input id="streetAddrOne" name="streetAddrOne" className="form-control bigInput" value={this.state.streetAddrOne} placeholder={this.state.streetAddrOne} onChange={this.handleChange} type="text" />
          </div>
          <input className="btn btn-block btn-outline-primary btn-profile" type="submit" value="Save" />
          <br/><br/>
        </form>
      </Tab>
      
      <Tab eventKey="transactions" title="Transactions" >

      { this.state.transactions && Object.keys(this.state.transactions).length > 0 ? 
        <div>
          <img alt="calendar" width="20px" style={{marginBottom: "6px", marginRight: "6px"}} src={calendarImg} />
          <hr/> 
            {this.state.transactions.map(x => 
              <div key={x._id}>
                <div className="transactions">
                  <div>
                    <p className="tDate"><Moment format="DD/MM/YYYY">{x.date}</Moment></p>
                    <p className="tType">{x.type}</p>
                  </div>  
                  <div>
                    <p className={x.amount.substr(0,1) === "-" ? "tAmountred" : "tAmountgreen"}>{x.amount}</p>
                  </div>
                </div> <hr/> 
              </div> )}
           
        </div> 
          : <p>You don't have transactions</p> }
      
      </Tab>

    </Tabs>
   </div> 
  </div>
</div> 
  )}

}


// Validations

const validator = require('validator');
const validate = values => {

const errors = {}
  // email
  // if(!values.email) { errors.email = 'Insert email' }
  // if(values.email && !validator.isEmail(values.email)){ errors.email = "Invalid email"}
  
  // password
  if(values.newpassword && values.newpassword.length > 0 && !validator.isLength(values.password, 8, 20)){ errors.password = "Password must be between 8 and 20 characters"}

  // if(!values.streetAddrOne) { errors.streetAddrOne = 'Insert streetAddrOne' }

  // if(!values.streetAddrTwo) { errors.streetAddrTwo = 'Insert streetAddrTwo' }

  // if(!values.city) { errors.city = 'Insert city' }

  // if(!values.zip) { errors.zip = 'Insert zip' }

  // if(!values.firstName) { errors.firstName = 'Insert firstName' }

  // if(!values.lastName) { errors.lastName = 'Insert lastName' }

  //  if(!values.firmName) { errors.firmName = 'Insert firmName' }

  //  if(values.stateBar && !validator.isInt(values.stateBar)){ errors.stateBar = 'State bar must be numeric' }
  //  if(!values.stateBar) { errors.stateBar = 'Insert state bar' }

  //  if(values.officePhone && !validator.isInt(values.officePhone)){ errors.officePhone = 'Office phone must be numeric' }
  //  if(!values.officePhone) { errors.officePhone = 'Insert officePhone' }

  //  if(values.mobilePhone && !validator.isInt(values.mobilePhone)){ errors.mobilePhone = 'Mobile phone must be numeric' }
  //  if(!values.mobilePhone) { errors.mobilePhone = 'Insert mobilePhone' }

  //  if(values.policy && !validator.isInt(values.policy)){ errors.policy = 'Policy must be numeric' }
  //  if(!values.policy) { errors.policy = 'Insert policy' }

  // no below
  // if(values.insurancePolicy && !validator.isInt(values.insurancePolicy)){ errors.insurancePolicy = 'Insurance policy must be numeric' }
  // if(!values.insurancePolicy) { errors.insurancePolicy = 'Insert insurancePolicy' }

  console.log(errors)
  return errors;
}

