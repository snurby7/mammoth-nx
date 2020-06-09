import { action } from '@storybook/addon-actions';
import { ButtonComponent } from './button.component';

export default {
  title: 'Common/Buttons',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [],
  },
  component: ButtonComponent,
  props: {
    onClick: action('Button Clicked'),
    value: 'Storybook',
    id: '123',
  },
});

export const Secondary = () => ({
  moduleMetadata: {
    imports: [],
  },
  component: ButtonComponent,
  props: {
    onClick: action('Button Clicked'),
    value: 'Storybook',
    id: '123',
    variant: 'secondary',
  },
});

export const Tertiary = () => ({
  moduleMetadata: {
    imports: [],
  },
  component: ButtonComponent,
  props: {
    onClick: action('Button Clicked'),
    value: 'Storybook',
    id: '123',
    variant: 'tertiary',
  },
});

export const Delete = () => ({
  moduleMetadata: {
    imports: [],
  },
  component: ButtonComponent,
  props: {
    onClick: action('Button Clicked'),
    value: 'Storybook',
    id: '123',
    variant: 'delete',
  },
});

export const Warn = () => ({
  moduleMetadata: {
    imports: [],
  },
  component: ButtonComponent,
  props: {
    onClick: action('Button Clicked'),
    value: 'Storybook',
    id: '123',
    variant: 'warn',
  },
});
