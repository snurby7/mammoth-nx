import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionGridComponent } from './transaction-grid.component';

describe('TransactionGridComponent', () => {
  let component: TransactionGridComponent;
  let fixture: ComponentFixture<TransactionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
