import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import ListSubmittable from './ListSubmittable';
import { ListItem } from '../../molecules/List';

// Note!: only test specific use cases for InputSubmittable.
// The rest is being covered by test of the child components.
describe('<ListSubmittable /> spec', () => {
  it('filters the list items', function () {
    const spy = jest.fn();

    const component = (
      <ListSubmittable
        onSubmit={spy}
        value={'item 2'}
        buttonLabel={'Search'}
        label={'Searchable item list'}
        listItems={[{ id: 1, children: 'item 1' }, { id: 2, children: 'item 2' }]}
      />
    );

    const { container, rerender } = render(component);
    const { firstElementChild } = container;
    expect(firstElementChild).toMatchSnapshot();

    const searchButton = (firstElementChild as Element).querySelector('button') as HTMLButtonElement;
    fireEvent.click(searchButton);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender(
      <ListSubmittable
        onSubmit={spy}
        value={'item 2'}
        buttonLabel={'Search'}
        listItemComponent={ListItem}
        label={'Searchable item list'}
        listItems={[{ id: 2, children: 'item 2' }]}
      />
    );
    expect(firstElementChild).toMatchSnapshot();

  });
});