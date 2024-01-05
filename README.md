# Custom-components-lib
This is the implementation of a custom components library similar to mui components

## How to run the app:
1. Install:
```
npm i custom-components-lib-23
```
https://www.npmjs.com/package/custom-components-lib-23?activeTab=readme

2. Import Components into project with necessary props.

## The Technologies used:
- Webpack,
- TypeScript,
- ESLint, Prettier, pre-commit hook,
- React,
- SCSS modules,
- Storybook,
- Jest, react testing library for unit tests,

### Set of components:
1. Button - similar to https://mui.com/material-ui/react-button/
 Props:
- variant: 'text' | 'contained' | 'outlined' , contained as default;
- disabled;
- onClick;
- size: 'small' | 'medium' | 'large';

2. TextField - https://mui.com/material-ui/react-text-field/
 Props:
- variant: 'outlined' | 'filled' | 'standart';
- error;
- errorText;
- label;
- disabled;

3. Select -  https://mui.com/material-ui/react-select/
 Props:
- label;
- disabled;
- options;
- onChange (method for getting selected option in a component);
- selected (passed selected option to component from parent component);

4. Checkbox - https://mui.com/material-ui/react-checkbox/
 Props:
- checked;
- label;
- color;
- disabled;
- onChange;

5. Switch- https://mui.com/material-ui/react-switch/
 Props:
- checked;
- onChange;

6. Modal - https://mui.com/material-ui/react-modal/
 Props:
- open;
- onClose;
- children;
