import { MatCardModule } from '@angular/material/card';
import { IBudget } from '@mammoth/api-interfaces';
import { action } from '@storybook/addon-actions';
import { MammothButtonModule } from '../../button/button.module';
import { BudgetTileComponent } from './budget-tile.component';

export default {
  title: 'Budget/BudgetTileComponent',
};

export const Primary = () => ({
  moduleMetadata: {
    imports: [MammothButtonModule, MatCardModule],
  },
  component: BudgetTileComponent,
  props: {
    budgetDetail: {
      id: '123',
      createdDate: '2020-06-08T13:12:30.666Z',
      name: 'Example Budget',
    } as IBudget,
    onDelete: action('delete budget'),
    onSelect: action('select budget'),
    onEdit: action('edit budget'),
  },
});
