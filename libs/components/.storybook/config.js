import '!style-loader!css-loader!sass-loader!../../../apps/mammoth/src/styles.scss';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, configure } from '@storybook/angular';

addDecorator(withKnobs);
configure(require.context('../src/lib', true, /\.stories\.(j|t)sx?$/), module);
