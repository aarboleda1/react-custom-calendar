import React from 'react';
// import { App } from '../../src';
import Popover from '../../src/components/Popover';
import '../../src/stylesheets/main.css';
function onAddEvent() {
	alert('event added!')
}
const Modal = () => <Popover onAddEvent={onAddEvent} showModal={true}/>;

export default Modal;