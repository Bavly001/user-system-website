import React, { Component } from 'react'

import './loader_style.css'

class loader extends Component {
      
      state = { loading: true }

      componentDidMount(){
            setTimeout(()=>{
                  this.setState({ loading: false });
            }, 2000)
      }

      render() {
            return (
                  <div
                  className={`loader-${this.state.loading ? 'in-work' : 'not-work'}`}
                  >
                        <div className='white-page page'/>
                        <div className='green-page page'/>
                        <div className='blue-page page'/>
                        <div className='red-page page'/>
                  </div>
            )
      }
}

export default loader;