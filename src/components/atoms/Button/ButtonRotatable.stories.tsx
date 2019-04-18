import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, select } from '@storybook/addon-knobs';

import ButtonRotatable from './ButtonRotatable';

storiesOf('atoms/ButtonRotatable', module)
  .add('default', () => (
    <ButtonRotatable
      onClick={action('button-click')}
      label={text('button-text', 'click me!')}
    />
  ))
  .add('with children', () => (
    <ButtonRotatable
      label={'click me!'}
      onClick={action('button-click')}
    >
      <span>{text('button-text', 'click with children!')}</span>
    </ButtonRotatable>
  ))
  .add('reversed rotation', () => (
    <ButtonRotatable
      label={'click me!'}
      onClick={action('button-click')}
      direction={select('direction', ['left', 'right'], 'right')}
    >
    </ButtonRotatable>
  ));