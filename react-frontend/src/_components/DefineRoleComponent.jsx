import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Header from './HeaderComponent';

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
                <h3><Link style={{color: "black"}} to="/"><i className="fas fa-1x fa-angle-left"></i></Link> Define your role</h3>
                  <ProgressBar height={5} percent={25} filledBackground="#2ad4ae" ></ProgressBar>
                <div>
                <p>Select an option</p>
                </div>
                <div className="define-container-block">
                  <div className="define-container" >
                      <div className="userDefineRole noleftmargin" onClick={()=>this.goToRegister('attorney')}>
                       <p className="userDefineRoleText">Attorney of Record</p>
                      </div>
                  </div>

                  <div className="define-container"  >
                      <div className="userDefineRole norightmargin" onClick={()=>this.goToRegister('seeker')}>
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
