import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import Label from './Label';

describe('<Label /> spec', () => {
  it('renders with text', function () {
    const component = (<Label>I'm a label!</Label>);
    const { container } = render(component);
    const { firstChild } = container;

    expect((firstChild as ChildNode).textContent).toEqual(`I'm a label!`);
  });
});