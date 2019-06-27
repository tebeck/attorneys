import Carousel from 'react-bootstrap/Carousel'
import React, { Component } from 'react';
import manWalkingImage from '../../_assets/img/landing/man_walking.png'

export default class HomeSlider extends Component {
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
      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
        controls={false}
      >
        <Carousel.Item>
          <div className="img-landing offset-md-1">
            <img className="img-landing0" src={manWalkingImage} alt="example" />
          </div>
          <div className="col-md-5 offset-md-6 offset-sm-0">
            <p className="slogan">Is a solution to connect attorneys of record or law firms who are required to appear at a hearing and appearing attorneys.</p>
          </div><br/><br/>
        </Carousel.Item>
        <Carousel.Item>
          <div className="img-landing offset-md-1">
            <img className="img-landing0" src={manWalkingImage} alt="example" />
          </div>
          <div className="col-md-5 offset-md-6">
            <p className="slogan">Is a solution to connect attorneys of record or law firms who are required to appear at a hearing and appearing attorneys.</p>
          </div><br/><br/>
        </Carousel.Item>
        <Carousel.Item>
          <div className="img-landing offset-md-1">
            <img className="img-landing0" src={manWalkingImage} alt="example" />
          </div>
          <div className="col-md-5 offset-md-6">
            <p className="slogan">Is a solution to connect attorneys of record or law firms who are required to appear at a hearing and appearing attorneys.</p>
          </div><br/><br/>
        </Carousel.Item>
      </Carousel>
    );
  }
}
