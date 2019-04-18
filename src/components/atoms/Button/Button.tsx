import React from 'react';
import styled from 'styled-components/macro';

export interface ButtonProps {
  /**
   * Is this a primary button.
   * @default false
   */
  primary?: boolean;
  /**
   * Is this a secondary button.
   * @default false
   */
  secondary?: boolean;
}

//TODO: theme gebruiken
const color = (props: ButtonProps) =>
  props.primary ? '#fff' :
    props.secondary ? '#bbb' : 'inherit'; /* TODO: theme */

const backgroundColor = (props: ButtonProps) =>
  props.primary ? '#0000ff' :
    props.secondary ? 'transparent' : 'inherit'; /* TODO: theme */

const textDecoration = (props: ButtonProps) =>
  props.secondary ? 'underline' : 'none';

const border = (props: ButtonProps) =>
  props.secondary ? 0 : null;

// TODO: these use props from htmlElement, howto type these without breaking anything?
const opacity = ({ disabled }: any) => disabled ? 0.5 : 1;
const pointerEvents = ({ disabled }: any) => disabled ? 'none' : 'inherit';
const cursor = ({ disabled }: any) => disabled ? 'not-allowed' : 'pointer';

/**
 * A simple button component
 */
const Button = styled.button`
  height: 40px; /* TODO: theme */
  padding: 8px 16px; /* TODO: theme */
  font-size: 0.875rem; /* TODO: theme */
  text-align: center;

  :active {
    opacity: 0.5; /* TODO: theme */
  };

  opacity: ${opacity};
  cursor: ${cursor};
  pointer-events: ${pointerEvents};
  color: ${color};
  background-color: ${backgroundColor};
  text-decoration: ${textDecoration};
  font-variant: small-caps;
  border: ${border};
`;

export default Button;