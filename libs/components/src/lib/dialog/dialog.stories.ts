import { action } from '@storybook/addon-actions';
import { DialogComponent } from './dialog.component';

export default {
  title: 'Components/Dialog',
};

export const Primary = () => ({
  component: DialogComponent,
  props: {
    buttonText: 'Click Me',
    onClose: action('Closed'),
  },
});
