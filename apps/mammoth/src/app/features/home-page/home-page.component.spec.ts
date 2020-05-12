import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { BudgetModule } from '../budget';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [BudgetModule, RouterModule],
      providers: [
        {
          provide: Router,
          useValue: {},
        },
        {
        provide: ActivatedRoute,
          useValue: ({
            snapshot: { params: { budgetId: '123' } },
          } as unknown) as ActivatedRoute,
        },
        provideMockStore({}),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
