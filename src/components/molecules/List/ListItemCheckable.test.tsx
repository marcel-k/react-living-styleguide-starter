import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import ListItemCheckable from './ListItemCheckable';

describe('<ListItemCheckable /> spec', () => {
  it('renders default not selectable', function () {
    const spy = jest.fn();
    const component = (<ListItemCheckable onSelect={spy}></ListItemCheckable>);

    const { container } = render(component);
    const { firstElementChild } = container;

    fireEvent.click(firstElementChild as Element);
    expect(spy).not.toHaveBeenCalled();
  });

  it('select is not fired when checkbox is clicked', function () {
    const spySelect = jest.fn();
    const spyChange = jest.fn();
    const component = (
      <ListItemCheckable
        selectable={true}
        onSelect={spySelect}
        onChange={spyChange}
      >
      </ListItemCheckable>
    );

    const { container } = render(component);
    const { firstElementChild } = container;
    const hiddenInput = (firstElementChild as Element).querySelector(`input[type='checkbox']`) as HTMLInputElement;

    fireEvent.click(hiddenInput);
    expect(spySelect).not.toHaveBeenCalled();
    expect(spyChange).toHaveBeenCalled();
  });
});