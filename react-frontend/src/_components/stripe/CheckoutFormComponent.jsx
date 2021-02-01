import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {stripeService} from '../../_services/stripe.service'
import Cookies from 'js-cookie';
import Dialog from 'react-bootstrap-dialog'
import esquired from '../../_assets/img/landing/logo.png'

Dialog.setOptions({
  defaultOkLabel: 'OK',
  defaultCancelLabel: 'Cancel',
  primaryClassName: 'btn-primary',
  defaultButtonClassName: 'btn-secondary btn-secondary-style'
})

var style = {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

class CheckoutFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: false,
      message: '',
      submitButton: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   async handleSubmit(ev) {
     ev.preventDefault()

    let {token} = await this.props.stripe.createToken({name: "Name"});
    token.email = Cookies.getJSON('esquired').email;
    stripeService.createNewCreditCard(token)
      .then(data => {
        if(data.status === 200){
        this.dialog.show({
              title: <img alt="esquired" className="dialog-img" src={esquired} />,
              body: data.message,
              actions: [ Dialog.OKAction(() => { window.location.assign('/profile') })],
              bsSize: 'small',
              onHide: (dialog) => { 
                dialog.hide() 
                window.location.assign('/profile') 
              }
         })
      }})
}

  handleChange = (e) => {
    if(e.error && e.error.code){
      console.log("no ok")
      console.log(e.error.message)
      this.setState({
        errors: true,
        message: e.error.message,
        submitButton: true
      })
    } else {
      console.log("ok")
      this.setState({
        errors: false,
        message: '',
        submitButton: false
      })
    }
  }


  render() {

    return (
      <div className="checkout">
      <Dialog ref={(el) => { this.dialog = el }} />
      <form onSubmit={this.handleSubmit}>
        <p>Please add here your details:</p>
        <div style={{ marginTop: "50px", marginBottom: "50px"}}>
        { this.state.errors && <div style={{fontSize: "13px", padding: "1px", margin: "0px",color:"red"}} >{this.state.message}</div>}
          <CardElement style={style} onChange={this.handleChange} />
        </div>
        <input disabled={this.state.submitButton} className="btn link-button" type="submit" value="Add credit card"/>
      </form>
        {/* <button className="btn link-button" onClick={this.submit}>Add credit card</button> */}
      </div>
    );
  }
}

export default injectStripe(CheckoutFormComponent);