import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import List from './List';

describe('<List /> spec', () => {
  it('renders with one child', function () {
    const component = (<List><li data-testid={'first'}>item 1</li></List>);
    const { getByTestId } = render(component);

    expect(getByTestId('first')).toBeDefined();
  });
});