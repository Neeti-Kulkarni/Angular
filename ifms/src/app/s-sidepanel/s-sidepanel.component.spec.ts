import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSidepanelComponent } from './s-sidepanel.component';

describe('SSidepanelComponent', () => {
  let component: SSidepanelComponent;
  let fixture: ComponentFixture<SSidepanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SSidepanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SSidepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
