import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { action } from '@storybook/addon-actions';
import { MammothDialogComponent } from './dialog.component';

export default {
  title: 'Components/Dialog',
};

export const Primary = () => ({
  component: MammothDialogComponent,
  moduleMetadata: {
    imports: [MatDialogModule, CommonModule],
  },
  props: {
    buttonText: 'Click Me',
    onClose: action('Closed'),
  },
});
