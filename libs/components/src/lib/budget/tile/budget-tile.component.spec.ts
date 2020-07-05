import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTileComponent } from './budget-tile.component';

describe('BudgetTileComponent', () => {
  let component: BudgetTileComponent;
  let fixture: ComponentFixture<BudgetTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
