import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import TextBox from './TextBox';

storiesOf('atoms/TextBox', module)
  .add('default', () => (
    <TextBox />
  ))
  .add('with placeholder', () => (
    <TextBox placeholder={text('placeholder', 'input text here...')} />
  ));