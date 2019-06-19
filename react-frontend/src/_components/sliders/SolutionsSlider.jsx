import Carousel from 'react-bootstrap/Carousel'
import React, { Component } from 'react';
import solutionImage from '../../_assets/img/landing/landing_oursolutions.png'

export default class SolutionsSlider extends React.Component {
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
            <div className="solution-title">Lorem Ipsum Title</div>
            <div className="solution-desc">Lorem ipsum dolor sit amet, conse ctetuer adipiscing enean commodo ligula eget dolor enean massa um sociis natoque penatibus et magnis. </div>
          </div>
          </div><br/><br/>
        </Carousel.Item>
        <Carousel.Item>
          <div className="solutions-square-item">
          <div className="solutions-square">
            <div className="solution-image" style={{ backgroundImage: "url(" + solutionImage +")" }}></div>
            <div className="solution-title">Lorem Ipsum Title</div>
            <div className="solution-desc">Lorem ipsum dolor sit amet, conse ctetuer adipiscing enean commodo ligula eget dolor enean massa um sociis natoque penatibus et magnis. </div>
          </div>
          </div><br/><br/>
        </Carousel.Item>
        <Carousel.Item>
          <div className="solutions-square-item">
          <div className="solutions-square">
            <div className="solution-image" style={{ backgroundImage: "url(" + solutionImage +")" }}></div>
            <div className="solution-title">Lorem Ipsum Title</div>
            <div className="solution-desc">Lorem ipsum dolor sit amet, conse ctetuer adipiscing enean commodo ligula eget dolor enean massa um sociis natoque penatibus et magnis. </div>
          </div>
          </div><br/><br/>
        </Carousel.Item>        
      </Carousel>
    );
  }
}
