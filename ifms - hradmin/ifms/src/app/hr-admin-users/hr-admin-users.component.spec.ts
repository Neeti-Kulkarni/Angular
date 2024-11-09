import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAdminUsersComponent } from './hr-admin-users.component';

describe('HrAdminUsersComponent', () => {
  let component: HrAdminUsersComponent;
  let fixture: ComponentFixture<HrAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrAdminUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
