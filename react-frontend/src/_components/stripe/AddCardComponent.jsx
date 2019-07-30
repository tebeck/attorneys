import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutFormComponent from './CheckoutFormComponent'


class AddCardComponent extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="container">
        <StripeProvider apiKey="pk_test_fs1ZhlQQt7WJrMvsDVQ3XiMc00Bw0T56nx">
          <Elements>
            <CheckoutFormComponent />
          </Elements>
        </StripeProvider>
       </div> 
    );
  }
}

export default AddCardComponent;