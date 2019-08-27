import Carousel from 'react-bootstrap/Carousel'
import React, { Component } from 'react';
import solutionImage from '../../_assets/img/landing/landing_oursolutions.png'

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
            <div className="solution-desc">Fill out the necessary information under “Create A New Request” tab, Upload the necessary documents, and wait for results! </div>
          </div>
          </div><br/>
        </Carousel.Item>
        <Carousel.Item>
          <div className="solutions-square-item">
          <div className="solutions-square">
            <div className="solution-image" style={{ backgroundImage: "url(" + solutionImage +")" }}></div>
            <div className="solution-title">24-Hour Payments! </div>
            <div className="solution-desc">Handled an appearance yesterday? Get paid tomorrow. Esquire’d uses Stripe technology to directly deposit your money! Handle cases today, make money within 24-hours. Simple.  </div>
            </div>
          </div><br/>
        </Carousel.Item>
        <Carousel.Item>
          <div className="solutions-square-item">
          <div className="solutions-square">
            <div className="solution-image" style={{ backgroundImage: "url(" + solutionImage +")" }}></div>
            <div className="solution-title">Stacking</div>
            <div className="solution-desc">Stacking allows appearing attorneys to maximize their profits. If you accept a hearing, our
technology will automatically notify you of other hearings in the same court at the same time.
This will allow appearing attorneys to maximize their profits! </div>
</div>
          </div><br/>
        </Carousel.Item>
      </Carousel>
    );
  }
}
