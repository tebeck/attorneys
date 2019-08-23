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


class CheckoutFormComponent extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

   async submit(ev) {
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

  render() {
    return (
      <div className="checkout">
      <Dialog ref={(el) => { this.dialog = el }} />
        <p>Please insert your credit card information</p>
        <CardElement /><br /><br />
        <button className="btn link-button" onClick={this.submit}>Add credit card</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutFormComponent);