import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { useState } from 'react';

import TextBoxSubmittable from './TextBoxSubmittable';

storiesOf('molecules/TextBoxSubmittable', module)
  .add('default', () => {
    const [value, setValue] = useState('');
    return (
    <TextBoxSubmittable
      value={value}
      buttonLabel={'Go!'}
      label={'Submit some text'}
      placeholder={text('placeholder','Input text here..')}
      onSubmit={action(`Submit '${value}'`)}
      onChange={(_, val) => setValue(val)}
    />
    );
  });
