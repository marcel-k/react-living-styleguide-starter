import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import ListItem from './ListItem';

describe('<ListItem /> spec', () => {
  it('renders with one child', function () {
    const component = (<ListItem><span data-testid={'first'}></span></ListItem>);
    const { getByTestId } = render(component);

    expect(getByTestId('first')).toBeDefined();
  });

  it('renders with primary colors when selected', function () {
    const spy = jest.fn();
    const component = (
      <ListItem onSelect={spy}>
        <span data-testid={'first'}></span>
      </ListItem>
    );

    const { container, rerender } = render(component);
    const { firstChild, firstElementChild } = container;
    fireEvent.click(firstElementChild as Element);

    expect(spy).toHaveBeenCalledTimes(1);

    rerender(
      <ListItem onSelect={spy} selected={true}>
        <span data-testid={'first'}></span>
      </ListItem>
    );

    expect(firstChild).toHaveStyleRule('color', '#fff');
    expect(firstChild).toHaveStyleRule('background-color', '#0000ff');
  });

  it('is not selected when not selectable', function () {
    const spy = jest.fn();
    const component = (
      <ListItem
        selectable={false}
        selected={true}
        onSelect={spy}
      >
        <span data-testid={'first'}></span>
      </ListItem>
    );

    const { container } = render(component);
    const { firstChild, firstElementChild } = container;

    expect(firstChild).not.toHaveStyleRule('color', '#fff');
    expect(firstChild).not.toHaveStyleRule('background-color', '#0000ff');

    fireEvent.click(firstElementChild as Element);
    expect(spy).not.toHaveBeenCalled();
  });
});