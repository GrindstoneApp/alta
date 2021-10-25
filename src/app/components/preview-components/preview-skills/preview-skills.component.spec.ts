import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSkillsComponent } from './preview-skills.component';

describe('PreviewWorkExperienceComponent', () => {
  let component: PreviewSkillsComponent;
  let fixture: ComponentFixture<PreviewSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
