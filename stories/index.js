import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Basic from './Basic';
import Modal from './Modal';

storiesOf('Basic Calendar', module)
  .add('Basic calendar', () => (<Basic/>))
storiesOf('Calendar', module)
  .add('Basic calendar', () => (<Modal/>))