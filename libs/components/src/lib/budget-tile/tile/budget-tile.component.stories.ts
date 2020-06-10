import { IBudget } from '@mammoth/api-interfaces';
import { action } from '@storybook/addon-actions';
import { ButtonModule } from '../../button/button.module';
import { BudgetTileComponent } from './budget-tile.component';

export default {
  title: 'Budget/BudgetTileComponent',
};

export const Primary = () => ({
  moduleMetadata: {
    imports: [ButtonModule],
  },
  component: BudgetTileComponent,
  props: {
    budgetDetail: {
      id: '123',
      createdDate: '2020-06-08T13:12:30.666Z',
      name: 'Example Budget',
    } as IBudget,
    onBudgetDelete: action('delete budget'),
    onBudgetSelect: action('select budget'),
    onBudgetEdit: action('edit budget'),
  },
});
