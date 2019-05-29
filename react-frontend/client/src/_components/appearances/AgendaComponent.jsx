import React, { Component } from 'react';
import {appearanceService} from '../../_services/appearance.service'
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import Moment from 'react-moment';
import {
  Timeline,
  Content,
  ContentYear,
  ContentBody,
  Description
} from 'vertical-timeline-component-react';

export default class AgendaComponent extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
	  	data: []
      };
	
	  appearanceService.getAppearances()
	    .then((result) => this.setState({
	  	  data: result.data
	  	})) 	
	}



    render() {
    
	const {data} = this.state
        return(


      <Timeline>
       <div className="">
		{data.map(x =>
                <Content key={x._id}>
                    <ContentYear year="" />
                    <ContentBody title="Today">
						  <div>
							 <div className="" style={{width:"290px", border: "1pt solid #E7ECEE", borderRadius: "4pt"}}>
							 	<div style={{height: "35%", backgroundColor: "#E7ECEE",borderRadius: "4pt 4pt 0px 0px",padding: "10px", fontSize: "13px"}}>
							 	  <div style={{display: "flex", justifyContent: "space-between"}}>  
							 	    <Moment format="LLL">{x.createdAt}</Moment>
							 	    <p>CRIMINAL</p>
							 	   </div> 
							 	</div>
							 	   <p style={{paddingTop: "10px", fontWeight: "700", lineSpacing:"14pt", fontSize: "13pt"}}>Trafic Trial</p>
							 	   <p style={{fontSize: "11px", color: "#000000",fontFamily: "Montserrat"}}>Hall of Justice - 2610 Riverside Drive, Susanville CA</p>
							 </div>
							 <br />
						</div>
                    </ContentBody>
                </Content>
		)}
		</div>	
      </Timeline>
	


        )
    }
}
