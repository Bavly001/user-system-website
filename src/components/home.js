import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { GoChevronDown } from 'react-icons/go';
import { LoremIpsum } from 'react-lorem-ipsum';


class Home extends Component {

  state = {
    titles: ['Add employees data', 'List employees data', 'Edit employees data', 'Delete employees data'],
    index: 0
  };

  next = () => {
    this.state.index >= this.state.titles.length - 1 ? this.setState({ index: 0 }) : this.setState({ index: this.state.index + 1 });
  }

  prev = () => {
    this.state.index <= 0 ? this.setState({ index: 3 }) : this.setState({ index: this.state.index - 1 });
  }

  render() {
    return (

      <div className='home-route' >
        <div className={'slider flex-center flex-column slider-style' + this.state.index}>
          <div className='container'>
            <h2 className='subtitle white-color'>What you can de here ... ?</h2>
            {<h1 className='title white-color'>{this.state.titles[this.state.index]}</h1>}
          </div>
          <div className='arrows'>
            <button className='circle-btn white-color' onClickCapture={this.prev}><FiArrowLeft /></button>
            <button className='circle-btn white-color' onClickCapture={this.next}><FiArrowRight /></button>
          </div>
          <button className='circle-btn no-background-circle-btn white-color' onClickCapture={() => { window.location.href = '#home-partitions' }}><GoChevronDown /></button>
        </div>

        {/* ----------------------------------------------------------------------------------------------------- */}

        <div className='home-partitions' id='home-partitions'>
          {this.state.titles.map((title, index)=>(
            <div key={index} className='partition container'>
            <h1 className='title'>{title}</h1>
            <LoremIpsum p={2} />
            <Link to={index === 0 ? "/add-employee" : "/list-employees" } className='circle-btn white-color'><FiArrowRight /></Link>
          </div>
          ))}
        </div>
      </div>
    )
  }
}
export default Home;