import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mammoth-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  @Input() displayedColumns: string[];
  @Input() dataSource: any[];
}
