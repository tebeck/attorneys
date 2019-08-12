import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutFormComponent from './CheckoutFormComponent'
import backbutton from '../../_assets/img/btnback.png'
import { Link } from 'react-router-dom';


class AddCardComponent extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div className="container">
      <Link style={{color: "black"}} to="/profile">
       <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
       <h3 style={{display: "inline"}  }> Add Credit Card</h3>
      </Link><hr />
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