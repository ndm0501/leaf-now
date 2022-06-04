import React from 'react';
import './Button.css';

const Button  = ({type, label, onClick}) => {
    return (
    <button onClick={onClick} className={`btn button button__${type}`}>
        {label}
    </button>);
}
export default Button;