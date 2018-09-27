import React, { Component } from 'react';

class Slang extends Component {
    render() {
        return (
            <div className='card'>
                <div className='card-header text-dark font-weight-bold'>
                    Slang Definition
                </div>
                <div className='card-body bg-light text-dark'>
                    <p>{this.props.result}</p>
                </div>
            </div>
        );
    };
};

export default Slang;