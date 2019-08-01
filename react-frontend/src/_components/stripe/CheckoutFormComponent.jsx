import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {stripeService} from '../../_services/stripe.service'
import Cookies from 'js-cookie';


class CheckoutFormComponent extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

   async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    token.email = Cookies.getJSON('esquired').email;
    stripeService.createNewCreditCard(token)
      .then(alert("Credit card added!"))
      .then(window.location.assign('/home'))
}

  render() {
    return (
      <div className="checkout">
        <p>Please insert your credit card information</p>
        <CardElement /><br /><br />
        <button className="btn link-button" onClick={this.submit}>Add credit card</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutFormComponent);