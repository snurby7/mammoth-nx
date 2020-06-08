import { IBudget } from '@mammoth/api-interfaces';
import { BudgetTileComponent } from './budget-tile.component';

export default {
  title: 'Budget/BudgetTileComponent',
};

export const Primary = () => ({
  moduleMetadata: {
    imports: [],
  },
  component: BudgetTileComponent,
  props: {
    budgetDetail: {
      id: '123',
      createdDate: '2020-06-08T13:12:30.666Z',
      name: 'Example Budget',
    } as IBudget,
  },
});
