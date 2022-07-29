import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryPopulatedComponent } from './repository-populated.component';

describe('RepositoryPopulatedComponent', () => {
  let component: RepositoryPopulatedComponent;
  let fixture: ComponentFixture<RepositoryPopulatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryPopulatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryPopulatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
