import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAdminProjectsComponent } from './hr-admin-projects.component';

describe('HrAdminProjectsComponent', () => {
  let component: HrAdminProjectsComponent;
  let fixture: ComponentFixture<HrAdminProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrAdminProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrAdminProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
