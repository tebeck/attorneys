import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backbutton from '../../_assets/img/btnback.png'
import Moment from 'react-moment';
import priceImg from '../../_assets/img/appearance/appearance_price.png'
import pingImg from '../../_assets/img/appearance/appearance_pin.png'
import StarRatings from 'react-star-ratings';
import { userServices } from '../../_services/user.service'
import Cookie from 'js-cookie'

export default class RateComponent extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      data: [this.props.location.state],
      rating: 0,
      userId: Cookie.getJSON('esquired').userId
    };

    console.log(this.state.data)


  
  this.changeRating = this.changeRating.bind(this);
  }

  changeRating( newRating, name ) {
      this.setState({
        rating: newRating
      });
    }



  handleClickRate = (x) =>{
    const body = {
      rating: this.state.rating,
      attorneyId: this.state.data[0].attorneyId,
      appId: this.state.data[0]._id,
      seekerId: this.state.data[0].subscription.seekerId 
    }

    console.log(body)
    if(this.state.userId === this.state.data[0].subscription.seekerId){
      console.log("es el appearing")
     userServices.rateAttorney(body)
      .then(alert("Attorney of record rated"))
      .then(window.location.assign("/home"))
    }
    if(this.state.userId === this.state.data[0].attorneyId){
      console.log("es el record")
     userServices.rateSeeker(body)
      .then(alert("Appearing attorney rated"))
      .then(window.location.assign("/home"))
    }

  }
  





  render() {
    
   const {data} = this.state

   return (
    <div className="container main-body">
      <Link style={{color: "black"}} to="/home">
       <img width="16px" style={{marginBottom: "11px"}} src={backbutton} alt="esquired" />
       <h3 style={{display: "inline"}  }> Rate Attorney</h3>
      </Link>			
       <hr />
      <div >
  {data.map(x =>

    <div key={x._id}>
        {x.status === "finished" ? 
        <div key={x._id} className="appearanceBox">
          <div className="appearanceHeaderBox">  
              <Moment className="timeformat" format="LL">{x.hearingDate}</Moment><span className="timeformat"> {x.time}</span>
          </div> 
          <div style={{minHeight: "150px", marginBottom: "20px"}}>
             <p className="titlebox">{x.caseName}</p>
            <div className="divmailing">
             <img alt="Esquired" width="20px" src={pingImg}></img>
             <p className="mailing">{x.courtHouse}</p>
           </div>
          <div className="divprice">
             <img alt="Esquired" width="18px" src={priceImg}></img>
             <p className="price">$75</p>  
          </div>
          <div className="right">
            { x.status === "applied" ?
             <button onClick={this.attorneyInfo.bind(this, x)} className="apply-button outlinebtn">Attorney info</button> : null }
            { x.status !== "completed" && x.status !== "finished" ? 
             <div><button onClick={this.handleClick.bind(this, x)} className="apply-button outlinebtn">Edit</button></div> :   null}
          </div>
          </div>
        </div>: null }

      </div>)}
      <div className="center"><br/><br/>
        <h5 style={{display: "inline"}  }>Rank your experience</h5><br/><br/><br/>
        
        <StarRatings
          rating={this.state.rating}
          starRatedColor="#f7bd2a"
          starHoverColor="#f7bd2a"
          starEmptyColor="white"
          changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
        /><br/><br/><br/>

        <button style={{padding: "10px 120px"}} onClick={this.handleClickRate} className="btn btn-block btn-primary link-button">Done!</button><br/><br/><br/>
      </div>
      </div>
       
    </div>
  	);
  }
}
