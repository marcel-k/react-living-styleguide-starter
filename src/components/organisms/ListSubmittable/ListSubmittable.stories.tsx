import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { Dispatch, SetStateAction, ChangeEvent } from 'react';

import { ListItemProps, ListItemCheckableProps } from '../../molecules/List';
import ListItemCheckable from '../../molecules/List/ListItemCheckable';
import ListSubmittable from './ListSubmittable';
import { text } from '@storybook/addon-knobs';

type ListItemPropsWithId = ListItemProps & { id: number };
type ListItemCheckablePropsWithId = ListItemCheckableProps & { id: number };

const serverItems = ['item 0', 'item 1', 'item 2', 'item 3', 'item 4'];
const createListItem = (
  id: number,
  value: string,
  selected: boolean,
  onSelect: Dispatch<SetStateAction<number>>,
  extraProps: {} = {}): ListItemPropsWithId => {
  return {
    ...extraProps,
    id,
    selected,
    children: value,
    onSelect: () => onSelect(id)
  };
};

const createCheckableListItem = (
  id: number,
  value: string,
  checked: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void,
  extraProps: {} = {}): ListItemCheckableProps & { id: number } => {
  return {
    ...extraProps,
    id,
    checked,
    onChange,
    children: value
  };
};

const useListItemApi = (initialValue: { id: number, value: string }[] = []) => {
  const [items, setItems] = useState(initialValue);

  useEffect(() => {
    // this would be a fetch from server. ideally, the items from the server would have an id already but the world is not ideal.
    const asyncFetchedItems = serverItems;
    const convertedItems = asyncFetchedItems.map((item, i) => ({ id: i, value: item }));
    setItems(convertedItems);
  }, []);

  // TODO: change to 'as consts' in TypeScript v3.4
  return [items, setItems] as [{ id: number, value: string }[], Dispatch<SetStateAction<{ id: number, value: string }[]>>];
}

const useSelectableListItems = (initialSelectedId = 0, items: { id: number; value: string; }[] = []) => {
  const [selectedId, setSelectedId] = useState(initialSelectedId);
  const [selectableItems, setSelectableItems] = useState<ListItemPropsWithId[]>(items);

  useEffect(() => {
    const convertedItems = items.map((item) => createListItem(item.id, item.value, item.id === selectedId, setSelectedId));
    setSelectableItems(convertedItems);
  }, [items, selectedId]);

  useEffect(() => {
    // only for storybook purposes
    action(`item selected with id ${selectedId}`)();
  }, [selectedId]);

  return { selectedId, setSelectedId, selectableItems, setSelectableItems };
}

const useFilteredListItems = <T extends ListItemPropsWithId>(allItems: T[]) => {
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState(allItems);

  const filterItems = (items: T[], query: string = '') => {
    return items.filter(({ children }) => query === '' || (children as string).indexOf(query) !== -1);
  };

  const reset = () => {
    setFilter('');
    setFilteredItems(allItems);
  };

  useEffect(() => {
    setFilteredItems(filterItems(allItems, filter));
  }, [allItems, filter]);

  return { filter, setFilter, filteredItems, setFilteredItems, reset };
}

const useCheckableListItems = (initialCheckedIds = [0], items: ListItemPropsWithId[] = []) => {
  const [checkedIds, setCheckedIds] = useState(initialCheckedIds);
  const [checkableItems, setCheckableItems] = useState<ListItemCheckablePropsWithId[]>(items);

  const toggleChecked = (id: number) => {
    const index = checkedIds.findIndex((checkedId: number) => checkedId === id);
    if (index !== -1) {
      action(`uncheck id ${id}`)();
      setCheckedIds(checkedIds.filter((_id, i) => i !== index));
    } else {
      action(`check id ${id}`)();
      setCheckedIds([...checkedIds, id]);
    }
  };
  const isChecked = (id: number) => checkedIds.some((checkedId) => checkedId === id);
  const onChange = (id: number) => () => toggleChecked(id);

  useEffect(() => {
    const convertedItems = items.map(({ id, children, ...rest }) => createCheckableListItem(id, children as string, isChecked(id), onChange(id), rest));
    setCheckableItems(convertedItems);
  }, [items, checkedIds]);

  return { checkableItems, toggleChecked };
}

storiesOf('organisms/ListSubmittable', module)
  .add('default listitems', () => {
    const [items] = useListItemApi([]);
    const [value, setValue] = useState('');
    const { selectableItems } = useSelectableListItems(0, items);
    const {
      filteredItems,
      setFilter,
      reset
    } = useFilteredListItems(selectableItems);

    const resetAndClear = () => {
      reset();
      setValue('');
    };

    return (
      <ListSubmittable
        value={value}
        listItems={filteredItems}
        buttonLabel={text('buttonLabel', 'Search')}
        label={text('label', 'Searchable item list')}
        onReset={() => { resetAndClear(); action('onReset')() }}
        placeholder={text('placeholder', 'Enter search query..')}
        onSubmit={(val) => { setFilter(val); action('onSubmit')(val); }}
        onChange={(_, val) => { setValue(val); action('onChange')(val); }}
      />
    );
  })
  .add('checkable listitems', () => {
    const [value, setValue] = useState('');
    const [items] = useListItemApi([]);
    const { selectableItems } = useSelectableListItems(0, items);
    const { checkableItems } = useCheckableListItems([], selectableItems);
    const {
      filteredItems,
      setFilter,
      reset
    } = useFilteredListItems(checkableItems);

    const resetAndClear = () => {
      reset();
      setValue('');
    };

    return (
      <ListSubmittable
        value={value}
        listItems={filteredItems}
        listItemComponent={ListItemCheckable}
        buttonLabel={text('buttonLabel', 'Search')}
        label={text('label', 'Searchable item list')}
        onReset={() => { resetAndClear(); action('onReset')() }}
        placeholder={text('placeholder', 'Enter search query..')}
        onSubmit={(val) => { setFilter(val); action('onSubmit')(val); }}
        onChange={(_, val) => { setValue(val); action('onChange')(val); }}
      />
    );
  });
