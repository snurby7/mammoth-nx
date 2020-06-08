import { action } from '@storybook/addon-actions';
import { ButtonComponent } from './button.component';

export default {
  title: 'Common/Buttons',
};

export const Primary = () => ({
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
