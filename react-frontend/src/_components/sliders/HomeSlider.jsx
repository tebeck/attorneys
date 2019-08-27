import Carousel from 'react-bootstrap/Carousel'
import React, { Component } from 'react';
import imageSlider from '../../_assets/img/landing/man_walking.png'
import imageSlider2 from '../../_assets/img/landing/request-waiting.png'
import imageSlider3 from '../../_assets/img/landing/request-business.png'

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
          <div className="row">
          <div className="img-landing valign col-md-6 col-lg-5 offset-lg-1">
            <img className="img-landing0 tovalign" src={imageSlider} alt="example" />
          </div>
          <div className="col-md-6 col-lg-5">
            <p className="slogan">Esquire’d is a platform for lawyers. We help connect attorneys through our technology. If you
cannot appear at a hearing, a deposition, or even a client meeting, you can come to our
platform to create a request. One of our vetted lawyers will happily appear for you. </p>
          </div>
          </div>
        </Carousel.Item>


        <Carousel.Item>
        <div className="row">
        <div className="img-landing valign col-md-6 col-lg-5 offset-lg-1">
          <img className="img-landing0 tovalign" src={imageSlider2} alt="example" />
        </div>
        <div className="col-md-6 col-lg-5">
            <p className="slogan">Stacking is a feature that will maximize your ability to accept special appearances. As an
appearing attorney, if you accept a hearing, our technology will notify you if there are other
appearances in the same court at the same time, maximizing your profitability. We will notify
you if “Late Call” is accepted and whether the client will be present. This will help you organize
your appearances.</p>
          </div>
          </div>
        </Carousel.Item>


        <Carousel.Item>
        <div className="row">
        <div className="img-landing valign col-md-6 col-lg-5 offset-lg-1">
          <img className="img-landing0 tovalign" src={imageSlider3} alt="example" />
        </div>
        <div className="col-md-6 col-lg-5">
            <p className="slogan">Same day results. At Esquire’d, we understand the communication required between lawyers
and clients. We ensure same-day results. Once an appearance is requested, it’s only a matter
of time until your results are uploaded by one of our vetted lawyers.</p>
          </div>
          </div>
        </Carousel.Item>
      </Carousel>
    );
  }
}
