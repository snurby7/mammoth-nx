import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth';
import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [MatButtonModule],
      providers: [
        {
          provide: AuthService,
          useValue: {},
        },
      ]
    }).createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
