import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import CheckBox from './CheckBox';

describe('<CheckBox /> spec', () => {
  it('renders default unchecked', function () {
    const component = (<CheckBox />);
    const { container } = render(component);
    const { firstElementChild } = container;

    const hiddenInput = (firstElementChild as Element).querySelector('input') as HTMLInputElement;

    expect(hiddenInput).toHaveProperty('checked', false);
  });

  it('renders with label', function () {
    const component = (<CheckBox label={'this is a label'} />);
    const { container } = render(component);
    const { firstElementChild } = container;

    const label = (firstElementChild as Element).querySelector('label') as HTMLLabelElement;

    expect(label.textContent).toEqual('this is a label');
  });

  it('shows a checkmark when checked', function () {
    const spy = jest.fn();
    const component = (
      <CheckBox
        onChange={spy}
        label={'this is a label'}
      />
    );
    const { container, rerender } = render(component);

    const { firstElementChild } = container;
    expect(firstElementChild).toMatchSnapshot(); // unchecked

    const hiddenInput = (firstElementChild as Element).querySelector('input') as HTMLInputElement;
    fireEvent.click(hiddenInput as Element);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender(
      <CheckBox
        onChange={spy}
        checked={true}
        label={'this is a label'}
      />);

    expect(firstElementChild).toMatchSnapshot(); // checked
  });
});