## React (16) & create-react-app & TypeScript & StoryBook & Jest & react-testing-library & Styled Components & Atomic Design  ~ A (not so) living styleguide

- Git clone and npm install
- Run the app with command: ``npm start``
  - Create a production ready build with command ``npm run build``
  - Locally serve the build by installing ``npm install -g serve`` and running  ``npm run serve``
  - Run bundle analyzer with ``npm run analyze``
- Run storybook styleguide with ``npm run storybook`` to generate styleguide
  - Create a static servable build with command ``npm run build:storybook``
  - locally serve the build by installing ``npm install -g serve`` and running  ``npm run serve:storybook``
  - Run bundle analyzer with ``npm run analyze:storybook``
- Run unittests with ``npm run test``
 - Run coverage report with ``npm run test:coverage``
 - Run unittests debugging with ``npm run test:debug``


## TODO list
- [ ] Add and describe atomic templates/layouts
- [ ] Describe way to create a component library with this setup
- [ ] Use https://github.com/mpeyper/react-hooks-testing-library for custom hooks testing
- [ ] Remove storybook hack in config for React Hooks https://github.com/storybooks/storybook/issues/5721
- [ ] Add styled component ThemeProvider
- [ ] Clean up code and tests
- [ ] Describe how to update dependencies

## Bugs
- [ ] Static build storybook not working correctly..
- [ ] Storybook crashes when using forwardRef..
- [ ] JEST styled components version behind (4.0)
- [ ] Storybook info not working properly with styled components
- [ ] Storybook info not showing description when using hiearchy / : ``storiesOf('atoms/Button', module)``
- [ ] Debugging tests not working properly?

## When writing components, stories and tests
### Components
- Write functional components with hooks (*class components not tested in this setup*)
- Components should have a ``default`` export
- Components must have a ``export interface *ComponentName*Props``
- Components must have JsDoc style (root) description
- Every property in a component prop interface should have JsDoc style comments and use `@default` if applicable
- input elements/components should either be controlled or uncontrolled (see links for more reading)
- *Optional* Create pages in a ``src/pages`` folder and group them by route:
  - ``pages``
  - ``pages --> routes.tsx``
  - ``pages --> user``
  - ``pages --> user --> login.tsx``
  - ``pages --> user --> account.tsx``

### Stories
- Write stories in `*.stories.tsx` in the same folder as the component
- ``.storiesOf('#name#', module)`` must have the same #name# as the component your testing, or a hierarchy path to it i.e. ``.storiesOf('path/to/#name#', module)``
- Use `addon-knobs` to make the styleguide interactive.
  - For the knobs to work correctly, you need to define a story variable as a function.
- Use  `addon-actions` to mock and log user interaction with the components.

### Tests
- Write unittests with jest and react-testing-library in `*.test.tsx` files in the same folder as the component.
- Tests are run and watched when executing ``npm test``
- Snapshots will be generated whenever `expect(..).toMatchSnapShot()` is called and stored in __snapshots__ folder. Don't be afraid to check the snapshots that are generated when testing.
- Write snapshot tests:
  - Only when you have a good use-case for it and when it makes sense.
  - Don't write useless snapshot tests that never fail or 'always' fail when you change a component.
  - Write snapshot tests for components that don't change often/should be stable.
  - Write snapshots tests if a component has conditional ui logic, i.e.: *if true then add element else do not add element*
  - If you find yourself automatically pressing *u*pdate when a certain snapshot fails, that snapshot test is useless and should be removed.
  - If you find yourself automatically pressing *u*(pdate) when any snapshot test fails, your snapshots tests have become useless and you should remove the ones that are useless.
- Use `jest-styled-components` to test if the correct styles are applied. Use for example `expect(..).toHaveStyleRule('color', 'white')` to check if the component color is white.
- `import 'react-testing-library/cleanup-after-each'` to auto cleanup cache etc. after each test.
- Generate a coverage report by running the command `npm run test:coverage`. You can view general results in the terminal and open `coverage/lcov-report/index.html` for more details.
- Debug tests by:
  - Placing a debugger in a test
  - Running `npm run test:debug`
  - Open Chrome browser and go to `about:inspect`
  - Click inspect on your target, this will open devTools

### Styled-components
- You need to import ``styled-components/macro`` when using styled components. This will use the ``babel-plugin-macros`` that comes with CRA and is needed to correctly work with tooling like Storybook. [more info here.](https://www.styled-components.com/docs/tooling#babel-macro)
- For syntax-highlighting styled-components, you can use several [plugins](https://www.styled-components.com/docs/tooling#syntax-highlighting), depending on you're IDE. Author uses and recommends `vscode-styled-components`.

## Project structure
- `.storybook` folder contains config for storybook, storybook addons and storybook webpack config.
- `public` contains the (only) files that may (directly) be accessed by the `index.html`
- `src` is where the magic happens of course. The folder contains examples of components, stories and tests using (trying) atomic design principles.
  - `@types` contains custom TypeScript typings for your project and shims for external libs.
  - `components` is where you create the standalone and re-useable `React` and `styled` components. The example uses the ***atomic-design*** pattern.
    - `atoms` for the lowest level components, like Button and TextBox
    - `molecules` for combining atoms into a more complex component, like SubmitTextBox
    - `organisms` for combining atoms and molecules, to create the most complex components, like SubmitList
    - `templates` ....
    - `__snaphots__` are generated by jest. these folders should be version controlled (don't .gitignore).
  - `pages` Use templates to place the correct organisms in the correct spot and page and route and supply the data consumed by components.


## Notes
Both Storybook and CRA depend on babel-loader vx.x.x.
Storybook needs it as a peer dependency in the project package.json and CRA as an internal dependency.
CRA will warn about any mismatch in version if you update it without updating the babel-loader dependency in the project package.json.

## Resources used to set this up (recommended to read)
- [create-react-app](https://github.com/facebook/create-react-app)
- [create-react-app testing](https://facebook.github.io/create-react-app/docs/running-tests)
- [react-testing-library](https://github.com/kentcdodds/react-testing-library)
- [react-testing-library docs](https://testing-library.com/docs/react-testing-library/intro)
- [storybook + react](https://storybook.js.org/basics/guide-react)
- [react-create-app (babel-loader) + storybook + typescript](https://storybook.js.org/configurations/typescript-config/)
- [storybook + typescript](https://storybook.js.org/configurations/typescript-config/)
- [storybook addon info](https://www.npmjs.com/package/@storybook/addon-info)
- [storybook + react + styled components](https://blog.bam.tech/developper-news/use-storybook-react-project)
- [react + storybook + typescript](https://medium.com/@mtiller/storybook-react-typescript-and-jest-c9059ea06fa7)
- ~~[storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots/storyshots-core)~~
- [Snapshot reality check](https://itnext.io/how-to-properly-test-react-components-9f090969cb6f)
- [When to snapshot](https://codeburst.io/a-place-for-jest-snapshot-testing-ca1fc737c457)
- [Similar repo implementation](https://github.com/leandrooriente/react-ui-kit-boilerplate)
- [styled-components tooling](https://www.styled-components.com/docs/tooling)
- [egghead.io React StoryBook TypeScript design system](https://egghead.io/courses/design-systems-with-react-and-typescript-in-storybook)
- [testing hooks](https://kentcdodds.com/blog/react-hooks-whats-going-to-happen-to-my-tests)
- [controlled and uncontrolled (form) components](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)
- [bundle analyzer](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [coverage reporting](https://facebook.github.io/create-react-app/docs/running-tests#coverage-reporting)
