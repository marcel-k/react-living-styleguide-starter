import React from 'react';
import { ReactNode, KeyboardEvent } from 'react';
import styled from 'styled-components/macro';

export interface ListItemProps {
  /**
   * If this listitem is selectable
   * @default true
   */
  selectable?: boolean;
  /**
   * If this listitem is selected
   * @default false
   */
  selected?: boolean;
  /**
   * Fires when the list-item:
   * - is clicked
   * - touched
   * - TODO: enter is pressed when focused
   */
  onSelect?: () => void;
  /**
   * Child elements will be horizontaly aligned in the middle (flex-direction row).
   */
  children?: ReactNode;
}

/* TODO: theme */
/* TODO: these functions are re-useable up to a certain level */
const cursor = ({ selectable }: ListItemProps) => selectable ? 'pointer' : 'inherit';
const color = ({ selected }: ListItemProps) => selected ? '#fff' : 'inherit';
const backgroundColor = ({ selected }: ListItemProps) => selected ? '#0000ff' : 'transparent';
const backgroundColorHover = ({ selectable }: ListItemProps) => selectable ? '#eee' : 'transparent';

/**
 * A simple ListItem component
 */
const StyledListItem = styled.li<ListItemProps>`
  min-height: 40px; /* TODO: theme */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  padding: 4px 8px; /* TODO: theme */
  border: 1px solid #ccc; /* TODO: theme */
  border-bottom: 0;
  cursor: ${cursor};
  color: ${color};
  background-color: ${backgroundColor};

  :hover {
    background-color: ${backgroundColorHover};
  }
`;

/**
 * A simple selectable list-item component
 */
const ListItem = (props: ListItemProps) => {
  const { className } = props as any; // TODO: we know this is passed by styled components, but don't want it on our interface?
  const {
    children,
    selected = false,
    selectable = true,
    onSelect = () => { }
  } = props;

  // TODO: refactor to utill function?
  const handleKeyDown = (_event: KeyboardEvent<HTMLLIElement>) => {

    // if (event.key === 'Enter') {
    // TODO: haha, li can't be focused
    //   handleSelect();
    // }
  };

  const handleSelect = () => {
    if(selectable) {
      onSelect();
    }
  }

  return (
    <StyledListItem
      onClick={handleSelect}
      selected={selectable && selected}
      onTouchEnd={handleSelect}
      selectable={selectable}
      onKeyDown={handleKeyDown}
      className={className}
    >
      {children}
    </StyledListItem>
  );
}

export default ListItem;