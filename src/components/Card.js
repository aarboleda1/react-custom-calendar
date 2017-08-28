import React, {Component} from 'react';
import classNames from 'classnames';

const Modal = (props) => {

	return(
    <div 
      name="rc-snap-shot-card"
      className="rc-snap-shot-card"
    >	
			{props.children}
		</div>
	)
}
export default Modal;