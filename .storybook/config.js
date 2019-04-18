import './styles.css';

import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, configure as reactConfigure } from '@storybook/react';
import React from 'react';

import { TableComponent } from './TableComponent';

const req = require.context('../src/components', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator(
  withInfo({
    inline: true,
    maxPropsIntoLine: 1,
    // define and style custom props component
    TableComponent
    // styles: {
    // https://github.com/storybooks/storybook/blob/master/addons/info/src/components/Story.js#L19.
    // },
  })
);
addDecorator(withKnobs);
// TODO: this is a hack to make storybook compatible with React Hooks
addDecorator((Story) => <Story />);
reactConfigure(loadStories, module);
