import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPopulatedComponent } from './user-populated.component';

describe('UserPopulatedComponent', () => {
  let component: UserPopulatedComponent;
  let fixture: ComponentFixture<UserPopulatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPopulatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPopulatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
