import React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components/macro';

export interface ListProps {
  /**
   * One or more components that either:
   * - are li element
   * - are ListItem component
   * - inherit from ListItem component
   */
  children?: ReactNode; // TODO: howto enforce ListItem or li element
}

/**
 * An unordered List component
 */
const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #ccc; /* TODO: Theme */

  li {
    list-style: none;
  }
`;

const List = (props: ListProps) => {
  const { children } = props;

  return (
    <StyledList>
      {children}
    </StyledList>
  );
};

export default List;