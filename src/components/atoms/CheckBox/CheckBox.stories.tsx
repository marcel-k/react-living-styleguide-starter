import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

import CheckBox from './CheckBox';

const handleAction = (setChecked: Dispatch<SetStateAction<boolean>>) =>
  (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setChecked(checked);
    return action(`Change to ${checked}`)(event);
  };

storiesOf('atoms/CheckBox', module)
  .add('default', () => {
    const [checked, setChecked] = useState(false);
    return (
      <CheckBox
        checked={checked}
        onChange={handleAction(setChecked)}
      />
    );
  })
  .add('default checked', () => {
    const [checked, setChecked] = useState(true);
    return (
      <CheckBox
        checked={checked}
        onChange={handleAction(setChecked)}
      />
    );
  })
  .add('with label', () => {
    const [checked, setChecked] = useState(false);
    return (
      <CheckBox
        checked={checked}
        onChange={handleAction(setChecked)}
        label={text('label', 'this is a label')}
      />
    );
  })
  .add('disabled', () => {
    const [checked, setChecked] = useState(false);
    const [disabled] = useState(true);
    return (
      <CheckBox
        checked={checked}
        label={`can't touch this`}
        onChange={handleAction(setChecked)}
        disabled={boolean('disabled', disabled)}
      />
    );
  });