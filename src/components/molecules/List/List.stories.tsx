import { text, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React, { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

import List from './List';
import ListItem from './ListItem';
import ListItemCheckable from './ListItemCheckable';

/**
 * @returns array of state, dispatch function and toggle function
 */
const useCheckableIds = (initialState: number[] = []): [number[], Dispatch<SetStateAction<number[]>>, (id: number) => void] => {
  const toggleCheckedId = (id: number) => {
    const index = checkedIds.findIndex((checkedId: number) => checkedId === id);
    if (index !== -1) {
      setCheckedIds(checkedIds.filter((_id, i) => i !== index));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const [checkedIds, setCheckedIds] = useState(initialState);

  return [checkedIds, setCheckedIds, toggleCheckedId];
}

storiesOf('molecules/List', module)
  .add('default', () => {
    const [selectedId, setSelectedId] = useState(0);
    return (
      <List>
        {[0, 1, 2].map((id) =>
          <ListItem
            key={id}
            selected={selectedId === id}
            onSelect={() => setSelectedId(id)}
            selectable={boolean('selectable', true)}
          >
            {text(`text ${id}`, `list-item ${id}`)}
          </ListItem>
        )}
      </List>
    );
  })
  .add('single checkable', () => {
    const [checkedId, setCheckedId] = useState(0);

    return (
      <List>
        {[0, 1, 2].map((id) =>
          <ListItemCheckable
            key={id}
            checked={checkedId === id}
            onChange={() => setCheckedId(id)}
          >
            {text(`text ${id}`, `list-item ${id}`)}
          </ListItemCheckable>
        )}
      </List>
    );
  })
  .add('multiple checkable', () => {
    const [checkedIds, _, toggleCheckedId] = useCheckableIds([0]);

    return (
      <List>
        {[0, 1, 2].map((id) =>
          <ListItemCheckable
            key={id}
            checked={checkedIds.some((checkedId) => checkedId === id)}
            onChange={() => toggleCheckedId(id)}
          >
            {text(`text ${id}`, `list-item ${id}`)}
          </ListItemCheckable>
        )}
      </List>
    );
  })
  .add('checkable and selectable', () => {
    const [checkedIds, _, toggleCheckedId] = useCheckableIds([0]);
    const [selectedId, setSelectedId] = useState(1);

    return (
      <List>
        {[0, 1, 2].map((id) =>
          <ListItemCheckable
            key={id}
            selectable={true}
            selected={selectedId === id}
            onSelect={() => setSelectedId(id)}
            onChange={() => toggleCheckedId(id)}
            checked={checkedIds.some((checkedId) => checkedId === id)}
          >
            {text(`text ${id}`, `list-item ${id}`)}
          </ListItemCheckable>
        )}
      </List>
    );
  });