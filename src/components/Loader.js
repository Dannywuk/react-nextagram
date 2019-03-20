import React from 'react';

const Loader=(props)=> <img style={{ height:props.height, width: props.width}} className="m-auto d-block" src={props.image} alt="Loading page"/> 

export default Loader