import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMaincontentComponent } from './s-maincontent.component';

describe('SMaincontentComponent', () => {
  let component: SMaincontentComponent;
  let fixture: ComponentFixture<SMaincontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SMaincontentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SMaincontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
