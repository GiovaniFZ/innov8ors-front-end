import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmUpdaterComponent } from './adm-updater.component';

describe('AdmUpdaterComponent', () => {
  let component: AdmUpdaterComponent;
  let fixture: ComponentFixture<AdmUpdaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmUpdaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
