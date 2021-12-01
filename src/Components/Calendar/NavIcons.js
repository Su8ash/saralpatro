import React, { Component } from 'react'
import { FaBeer, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export class NavIcons extends Component {

    

    render() {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: "0px 0px 40px 0px",
            }}>
            <div style={{
                width: '50px',
                display: 'flex',
                textAlign: this.props.left?"left":'right',
                padding: "10px 0",
                borderRadius:'12px',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                justifyContent: "center",
                alignContent: 'center',
                
          }}>
              {this.props.left? <FaChevronLeft />: <FaChevronRight /> } 
                </div>
                </div>
        )
    }
}

export default NavIcons
