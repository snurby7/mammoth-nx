import { action } from '@storybook/addon-actions';
import { ButtonComponent } from './button.component';

export default {
  title: 'Common/Buttons',
};

export const DefaultOutline = () => ({
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

export const Primary = () => ({
  moduleMetadata: {
    imports: [],
  },
  component: ButtonComponent,
  props: {
    onClick: action('Button Clicked'),
    value: 'Storybook',
    id: '123',
    variant: 'primary',
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
