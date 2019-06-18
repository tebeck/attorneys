import React, {Component} from 'react';
import loader from '../_assets/img/loader.gif'

export default class LoaderAnimation extends Component {

  render() {
    return (<div className="loader-animation">
      <img src={loader} alt="esquired" />
    </div>)
  }
}
