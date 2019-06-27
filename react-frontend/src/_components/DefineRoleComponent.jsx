import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Header from './HeaderComponent';
import checkImg from '../_assets/img/appearance/appearance_check.png'
import backbutton from '../_assets/img/btnback.png'

export default class DefineRoleComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        selected: false
      }
    }
    goToRegister = (type) => {
      let isAttorney=false;
      let isSeeker=true;
      if (type==='attorney'){
        isAttorney=true;
        isSeeker=false;
      }
      this.setState({
        isAttorney: isAttorney,
        isSeeker: isSeeker,
        selected: true
      })
    }
    render() {

      if (this.state.selected) {
        return <Redirect push to={{ pathname: "/register",  state:{ isSeeker: this.state.isSeeker, isAttorney: this.state.isAttorney } }} />;
      }
    	return (
          <div>
            <Header guest="1" />
            <div className="container main-body">
                <Link style={{color: "black"}} to="/"><img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" /><h3 style={{display: "inline"}  }> Define your role</h3></Link>
                  <br />
                  <div className="center"><ProgressBar height={5} percent={25} filledBackground="#2ad4ae" ></ProgressBar> <img className="grey-check-icon" width="18px" src={checkImg} /></div>
                  <br />
                <div>
                <p>Select an option</p>
                </div>
                <div className="define-container-block">
                  <div className="define-container">
                      <div className="userDefineRole noleftmargin" onClick={() => this.goToRegister('attorney')}>
                       <p className="userDefineRoleText">Attorney of Record</p>
                      </div>
                  </div>

                  <div className="define-container"  >
                      <div className="userDefineRole norightmargin" onClick={() => this.goToRegister('seeker')}>
                       <p className="userDefineRoleText">Appearing Attorney</p>
                      </div>
                  </div>

                </div>
              </div>
          </div>
    	);
    }
}


export { DefineRoleComponent };
