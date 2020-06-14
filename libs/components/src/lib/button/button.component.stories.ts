import { action } from '@storybook/addon-actions';
import { ButtonComponent } from './button.component';
import { MammothButtonModule } from './button.module';

export default {
  title: 'Components/Buttons',
};

export const DefaultOutline = () => ({
  moduleMetadata: {
    imports: [MammothButtonModule],
  },
  component: ButtonComponent,
  props: {
    onClick: action('Button Clicked'),
    value: 'Storybook',
    id: '123',
  },
  template: `<mammoth-button>Default</mammoth-button>`,
});

export const Primary = () => ({
  moduleMetadata: {
    imports: [MammothButtonModule],
  },
  component: ButtonComponent,
  props: {
    onClick: action('Button Clicked'),
    value: 'Storybook',
    id: '123',
    variant: 'primary',
  },
  template: `<mammoth-button variant="primary">Primary</mammoth-button>`,
});

export const Delete = () => ({
  moduleMetadata: {
    imports: [MammothButtonModule],
  },
  component: ButtonComponent,
  props: {
    onClick: action('Button Clicked'),
    value: 'Storybook',
    id: '123',
    variant: 'delete',
  },
  template: `<mammoth-button variant="delete">Delete</mammoth-button>`,
});
