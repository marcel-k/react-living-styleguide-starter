import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import TextBoxSubmittable from './TextBoxSubmittable';

// Note!: only test specific use cases for InputSubmittable.
// The rest is being covered by test of the child components.
describe('<TextBoxSubmittable /> spec', () => {
  it('submits after enter key', function () {
    const spy = jest.fn();
    const component = (
      <TextBoxSubmittable
        label={'Search for something'}
        buttonLabel={'go!'}
        onSubmit={spy}
      />
    );
    const { container } = render(component);
    const { firstElementChild } = container;

    const input = (firstElementChild as Element).querySelector('input') as HTMLInputElement;
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(spy).toHaveBeenCalledTimes(1);
  });
});