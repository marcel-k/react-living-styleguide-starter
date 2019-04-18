import React from 'react';
import styled from 'styled-components/macro';

import { Button } from '../../atoms/Button';
import { List, ListItem, ListItemProps } from '../../molecules/List';
import { TextBoxSubmittable, TextBoxSubmittableProps } from '../../molecules/TextBoxSubmittable';

export interface ListSubmittableProps<T extends ListItemProps> extends TextBoxSubmittableProps {
  /**
   * Supply a custom item component that extends ListItemProps.
   * @default ListItem will be used as standard component.
   */
  listItemComponent?: React.FunctionComponent<T>;
  /**
   * The items that should be displayed.
   */
  listItems: (T & { id: number | string })[];
  /**
   * Fires when reset button is clicked.
   */
  onReset?: () => void;
  /**
   * This component cannot have children.
   */
  children?: null;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    margin-bottom: 4px;
  }
`;

const SearchBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  > button {
    margin-left: 4px;
  }
`;

/**
 * A complex generic list component that can be made searchable / filterable with a TextBoxSubmittable.
 */
const ListSubmittable = <T extends ListItemProps>(props: ListSubmittableProps<T>) => {

  const {
    listItems = [],
    onReset = () => { },
    listItemComponent = ListItem,
    ...textBoxProps } = props;

  const ListItemComponent = listItemComponent;

  return (
    <Wrapper>
      <SearchBoxWrapper>
        <TextBoxSubmittable {...textBoxProps} />
        <Button onClick={onReset} secondary>reset</Button>
      </SearchBoxWrapper>
      <List>
        {
          listItems.map((listItemProps) => (
            <ListItemComponent {...listItemProps} key={listItemProps.id} />
          ))
        }
      </List>
    </Wrapper>
  );
};

export default ListSubmittable;