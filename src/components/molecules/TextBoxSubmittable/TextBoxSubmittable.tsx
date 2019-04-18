import React from 'react';
import { ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components/macro';

import { Button } from '../../atoms/Button';
import { Label } from '../../atoms/Label';
import { TextBox } from '../../atoms/TextBox';

export interface TextBoxSubmittableProps {
  /**
   * The value of the textbox
   * @default empty string
   */
  value?: string;
  /**
   * Set the textbox or button disabled.
   * @default false
   */
  disabled?: false | 'button' | 'textbox' | 'both';
  /**
   * Label text.
   */
  label: string;
  /**
   * Label of button.
   */
  buttonLabel: string;
  /**
   * Input placeholder text.
   */
  placeholder?: string;
  /**
   * Fires when the button is clicked.
   */
  onSubmit?: (value: string) => void;
  /**
   * Fires when value of textBox changes
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
}

const Wrapper = styled.div`
  display: inline-flex;
  align-items: flex-end;
`;

const TextBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 4px; /* TODO: theme */
`;

/**
 * Submit input build with Label, Button and TextBox.
 */
const TextBoxSubmittable = (props: TextBoxSubmittableProps) => {
  const {
    label,
    value = '',
    buttonLabel,
    disabled = false,
    placeholder = '',
    onSubmit = () => { },
    onChange = () => { }
  } = props;

  const handleSubmit = () => {
   onSubmit(value);
  };

  const handleClick = () => {
    handleSubmit();
  };

  // TODO: refactor to utill function
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event, event.target.value);
  };

  return (
    <Wrapper>
      <TextBoxWrapper>
        <Label>{label}</Label>
        <TextBox
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      </TextBoxWrapper>
      <Button onClick={handleClick} primary>
        {buttonLabel}
      </Button>
    </Wrapper>
  );
};

export default TextBoxSubmittable;