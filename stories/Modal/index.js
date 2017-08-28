import React from 'react';
// import { App } from '../../src';
import Modal from '../../src/components/Modal';
import '../../src/stylesheets/main.css';
function onAddEvent() {
	alert('event added!')
}
const ModalEx = () => <Modal onAddEvent={onAddEvent} showModal={true}/>;

export default ModalEx;