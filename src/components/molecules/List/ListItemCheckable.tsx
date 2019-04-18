import React, { ChangeEvent } from 'react';
import styled from 'styled-components/macro';

import { CheckBox, CheckBoxProps } from '../../atoms/CheckBox';
import ListItem, { ListItemProps } from './ListItem';

// TODO: is extending interfaces like this a good idea?
export interface ListItemCheckableProps extends ListItemProps, CheckBoxProps {
  /**
   * @default false
   */
  selectable?: boolean;
}

const StyledListItemCheckable = styled(ListItem)`
  padding-left: 0;
`;

/**
 * A simple checkable listitem component
 */
const ListItemCheckable = (props: ListItemCheckableProps) => {
  const {
    children,
    selectable = false,
    onChange = () => { },
    ...passThroughProps
  } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onChange(event, checked);
  };

  return (
    <StyledListItemCheckable selectable={selectable} {...passThroughProps}>
      <div onClick={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation()}}>
        <CheckBox {...passThroughProps} onChange={handleChange} />
      </div>
      <div>
        {children}
      </div>
    </StyledListItemCheckable>
  );
}

export default ListItemCheckable;