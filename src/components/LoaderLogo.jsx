import React from 'react'
import './loader.css'

const LoaderLogo = () => {
  return (
    <div id='preloader'>
	    <div class='preloader-logo'>
            <svg width="138" height="111" viewBox="0 0 138 111" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="layer-1" d="M0.507812 0.721191H62.0052L98.1827 110.491H36.6853L0.507812 0.721191Z" fill="#282828"/>
                <path id="layer-2" d="M65.3535 10.8994L108.495 10.8994L137.963 100.313H94.8221L65.3535 10.8994Z" fill="#282828"/>
                <path id="layer-3" d="M54.6306 76.092L42.6735 45.1717L38.2207 44.4867V32.2182H66.6499V44.4867L63.4115 45.1717L68.4871 61.4881L73.5626 45.1717L70.3242 44.4867V32.2182H98.7535V44.4867L95.5462 45.1717L100.591 61.4881L105.666 45.1717L102.428 44.4867V32.0625H123.975V44.4867L119.554 45.1717L107.597 76.092H86.7652L81.0981 59.2462L75.4932 76.092H54.6306Z" fill="white"/>
            </svg>
	    </div>
    </div>
  )
}

export default LoaderLogo