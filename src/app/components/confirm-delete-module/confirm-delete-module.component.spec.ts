import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteModuleComponent } from './confirm-delete-module.component';

describe('ConfirmDeleteModuleComponent', () => {
  let component: ConfirmDeleteModuleComponent;
  let fixture: ComponentFixture<ConfirmDeleteModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
