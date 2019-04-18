import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import TextBox from './TextBox';

// TODO: no need to test styled component atoms?
// Is not your code, will be tested by lib maintainers.
// Yeah but what about 'style-logic' like 'if primary' etc.
describe('<TextBox /> spec', () => {
  it('renders with placeholder', function () {
    const component = (<TextBox placeholder={'a placeholder..'} />);
    const { container } = render(component);
    const { firstElementChild } = container;

    expect((firstElementChild as Element)).toHaveProperty('placeholder', 'a placeholder..');
  });
});