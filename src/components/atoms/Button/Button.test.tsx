import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import Button from './Button';
import ButtonRotatable from './ButtonRotatable';

describe('<Button /> spec', () => {
  it('renders text as label', function () {
    const component = (<Button>click me!</Button>);
    const { container } = render(component);
    const { firstChild } = container;

    expect((firstChild as ChildNode).textContent).toEqual('click me!');
  });

  it('renders with primary colors', function () {
    const component = (<Button primary>click me!</Button>);
    const { container } = render(component);
    const { firstChild } = container;

    // TODO: get colors from theme? does this need to be tested like this?
    expect(firstChild).toHaveStyleRule('color', '#fff');
    expect(firstChild).toHaveStyleRule('background-color', '#0000ff');
  });

  it('renders with secondary colors', function () {
    const component = (<Button secondary>click me!</Button>);
    const { container } = render(component);
    const { firstChild } = container;

    // TODO: get colors from theme? does this need to be tested like this?
    expect(firstChild).toHaveStyleRule('color', '#bbb');
    expect(firstChild).toHaveStyleRule('text-decoration', 'underline');
  });
});

describe('<ButtonRotatable /> spec', () => {
  it('renders text as label', function () {
    const component = (<ButtonRotatable>click me!</ButtonRotatable>);
    const { container } = render(component);
    const { firstChild } = container;

    expect((firstChild as ChildNode).textContent).toEqual('click me!');
  });

  it('renders with children', function () {
    const component = (
      <ButtonRotatable label={`i won't be used`}>
        <span data-testid={'child'}>click me, I am a child!</span>
      </ButtonRotatable>
    );
    const { getByTestId } = render(component);

    expect(getByTestId('child')).toBeDefined();
  });

  it('rotates when clicked', function () {
    const component = (
      <ButtonRotatable direction={'left'}>
        I will rotate left
    </ButtonRotatable>
    );

    const { container, rerender } = render(component);

    const { firstElementChild } = container;
    expect(firstElementChild).toMatchSnapshot(); // 0deg

    fireEvent.click(firstElementChild as Element);
    expect(firstElementChild).toMatchSnapshot(); // 90deg

    rerender(
      <ButtonRotatable direction={'right'}>
        I will rotate right
      </ButtonRotatable>
    );

    fireEvent.click(firstElementChild as Element);
    expect(firstElementChild).toMatchSnapshot(); //0deg

    fireEvent.click(firstElementChild as Element);
    expect(firstElementChild).toMatchSnapshot(); //-90deg
  });
});
