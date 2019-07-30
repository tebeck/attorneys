import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {stripeService} from '../../_services/stripe.service'

class CheckoutFormComponent extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

   async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    console.log(token)

    stripeService.storeToken(token)
      .then(console.log("token stored"))
    
    // let response = await fetch("/charge", {
    //   method: "POST",
    //   headers: {"Content-Type": "text/plain"},
    //   body: token.id
    // });

  // if (response.ok) console.log("Purchase Complete!")
}

  render() {
    return (
      <div className="checkout">
        <p>Add new credit card</p>
        <CardElement /><br /><br />
        <button className="btn link-button" onClick={this.submit}>Add</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutFormComponent);