import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import logo from '../_assets/img/landing/logo.png'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<div className="navbar header-comp">
      <Link to="/"><i className="fas fa-bars green d-none"></i></Link>
        <div className="logo"><a href="/"><img src={logo} /></a></div>
    </div>)
  }
}
