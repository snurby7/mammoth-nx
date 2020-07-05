import { MatButtonModule } from '@angular/material/button';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/angular';
import { MammothButtonModule } from './button.module';

storiesOf('Components/Button', module)
  .add('Basic', () => ({
    template: `
      <mammoth-button (onClick)="onClick($event)" color="primary">Primary</mammoth-button>
    `,
    moduleMetadata: {
      imports: [MatButtonModule, MammothButtonModule],
    },
    props: {
      onClick: action('Button was clicked'),
    },
  }))
  .add('Warn', () => ({
    template: `
      <mammoth-button (onClick)="onClick($event)" color="warn">Warning Button</mammoth-button>
    `,
    moduleMetadata: {
      imports: [MatButtonModule, MammothButtonModule],
    },
    props: {
      onClick: action('Button was clicked'),
    },
  }))
  .add('Accent', () => ({
    template: `
      <mammoth-button (onClick)="onClick($event)" color="accent">Accent Button</mammoth-button>
    `,
    moduleMetadata: {
      imports: [MatButtonModule, MammothButtonModule],
    },
    props: {
      onClick: action('Button was clicked'),
    },
  }));
