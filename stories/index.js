import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Basic from './Basic';

storiesOf('Basic Calendar', module)
  .add('Basic calendar', () => (<Basic/>))
