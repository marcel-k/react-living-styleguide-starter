import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import Label from './Label';

storiesOf('atoms/Label', module)
  .add('default', () => (
    <Label>
      {text('text', 'this is a label')}
    </Label>
  ));