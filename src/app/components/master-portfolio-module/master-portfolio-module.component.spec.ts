import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPortfolioModuleComponent } from './master-portfolio-module.component';

describe('MasterPortfolioModuleComponent', () => {
  let component: MasterPortfolioModuleComponent;
  let fixture: ComponentFixture<MasterPortfolioModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPortfolioModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPortfolioModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
