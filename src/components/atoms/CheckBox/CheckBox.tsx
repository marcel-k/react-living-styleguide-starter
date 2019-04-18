import React from 'react';
import { useRef } from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components/macro';

interface CheckBoxDeclProps {
  /**
   * Sets the state of the checkBox.
   * @default false
   */
  checked?: boolean;
  /**
  * Fires when the checkbox checked state wants to change.
  */
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

interface LabelProps {
  /**
  * Give the checkbox a (clickable) label.
  */
 label?: string;
}

export interface CheckBoxProps extends CheckBoxDeclProps, LabelProps {
  /**
   * Set if the checkbox is disabled or not.
   * @default false
   */
  disabled?: boolean;
}

/**
 * Create an invisible checkbox that is visually overriden.
 */
const CheckBoxDecl = styled.input.attrs((props: CheckBoxDeclProps) => ({
  type: 'checkbox',
  checked: props.checked,
  onChange: props.onChange
}))`
  /* empty */
  `;

const StyledCheckBox = styled(CheckBoxDecl)`
    top: 0;
    left: 0;
    width: 100%;
    cursor: inherit;
    height: 100%;
    margin: 0;
    opacity: 0;
    padding: 0;
    position: absolute;
`;

const ClickArea = styled.span`
    display: inline-flex;
    justify-content:center;
    align-items: center;
    width: 40px; /* TODO: theme */
    height: 40px; /* TODO: theme */
    margin: 0;
    cursor: pointer;
    position: relative;
    user-select: none;
`;

const ClickBox = styled.span`
  display: inline-flex;
  justify-content:center;
  align-items: center;
  width: 28px; /* TODO: theme - border? */
  height: 28px; /* TODO: theme - border? */
  color: #bbb; /* TODO: theme */
  text-align: center;
  border: 2px solid #bbb; /* TODO: them */
  cursor: pointer;
  user-select: none;
  text-decoration: none;
`;

const Wrapper = styled.span<{ disabled: boolean }>`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    vertical-align: top;
    opacity: ${(props) => props.disabled ? 0.5 : 1}; /* TODO: theme */
`;

const Label = styled.label`
    display: block;
    margin: 0;
    color: #333; /* TODO: theme */
    font-size: 0.875rem; /* TODO: theme */
    font-weight: 700; /* TODO: theme */
    cursor: pointer;
`;

/**
 * A simple Checkbox component
 */
const CheckBox = (props: CheckBoxProps) => {

  const {
    label = null,
    checked = false,
    disabled = false,
    onChange = () => { },
    ...inputProps
  } = props;

  const input = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event, event.target.checked);
    }
  };

  const handleLabelClick = () => {
    if (input && input.current) {
      input.current.click();
    }
  }

  return (
    <Wrapper disabled={disabled}>
      <ClickArea>
        <StyledCheckBox
          ref={input}
          checked={checked}
          onChange={handleChange}
          {...inputProps}
        />
        <ClickBox>
          {/* TODO: theme 0000ff */}
          {checked &&
            <img src={`https://img.icons8.com/metro/26/${'0000ff'}/checkmark.png`} />
          }
        </ClickBox>
      </ClickArea>
      {label &&
        <Label onClick={handleLabelClick}>
          {label}
        </Label>
      }
    </Wrapper>
  );
};

// export default forwardRef(CheckBox);
export default CheckBox;