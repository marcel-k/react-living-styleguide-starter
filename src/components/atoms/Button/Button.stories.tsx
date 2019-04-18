import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, select } from '@storybook/addon-knobs';

import Button from './Button';

storiesOf('atoms/Button', module)
  .add('default', () => (
    <Button
      onClick={action('button-click')}
    >
      {text('button-text', 'click me!')}
    </Button>
  ))
  .add('primary', () => (
    <Button
      primary
      onClick={action('button-click')}
    >
      {text('button-text', 'click me!')}
    </Button>
  ))
  .add('secondary', () => (
    <Button
      secondary
      onClick={action('button-click')}
    >
      {text('button-text', 'click me!')}
    </Button>
  ));