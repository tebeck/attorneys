import Carousel from 'react-bootstrap/Carousel'
import React, { Component } from 'react';
import solutionImage from '../../_assets/img/landing/landing_oursolutions.png'
import moneyImage from '../../_assets/img/landing/money-1.jpeg'
import stackingImage from '../../_assets/img/landing/judge-1.jpeg'

export default class SolutionsSlider extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  render() {
    const { index, direction } = this.state;

    return (
      <Carousel className="mobile whitebackground"
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
        controls={false}
      >
        <Carousel.Item>
          <div className="solutions-square-item">
          <div className="solutions-square">
            <div className="solution-image" style={{ backgroundImage: "url(" + solutionImage +")" }}></div>
            <div className="solution-title">Creating a request is simple.</div>
          </div>
          </div><br/>
        </Carousel.Item>
        <Carousel.Item>
          <div className="solutions-square-item">
          <div className="solutions-square">
            <div className="solution-image" style={{ backgroundImage: "url(" + moneyImage +")" }}></div>
            <div className="solution-title">24-Hour Payments! </div>
            </div>
          </div><br/>
        </Carousel.Item>
        <Carousel.Item>
          <div className="solutions-square-item">
          <div className="solutions-square">
            <div className="solution-image" style={{ backgroundImage: "url(" + stackingImage +")" }}></div>
            <div className="solution-title">Stacking</div>
            </div>
          </div><br/>
        </Carousel.Item>
      </Carousel>
    );
  }
}