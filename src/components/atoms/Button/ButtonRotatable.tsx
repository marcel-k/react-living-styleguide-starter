import React from 'react';
import { useState, useEffect, useRef } from 'react';

import Button, { ButtonProps } from './Button';

interface Props extends ButtonProps {
  /**
   * Label of the button. Will be overwriten by any children of the component.
   */
  label?: string;
  /**
   * The direction the button will rotate.
   * @default left
   */
  direction?: 'left' | 'right';
  /**
   * fires when the button is clicked.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, currentRotation: number) => void;
  /**
   * If children is supplied, label will be overwritten by it.
   */
  children?: any;
}

/**
 * This button will rotate 90deg when you click on it.
 */
const ButtonRotatable = (props: Props) => {
  const {
    label,
    children,
    direction = 'left',
    onClick = () => undefined,
    ...buttonProps
  } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (buttonRef && buttonRef.current) {
      buttonRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  }, [rotation]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let r = direction === 'left' ? rotation + 90 : rotation - 90;
    setRotation(r);
    onClick(event, r);
  };

  return (
    <Button
      onClick={handleClick}
      ref={buttonRef}
      {...buttonProps}
    >
      {children || label}
    </Button>
  );
};

export default ButtonRotatable;