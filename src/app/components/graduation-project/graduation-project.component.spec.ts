import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduationProjectComponent } from './graduation-project.component';

describe('GraduationProjectComponent', () => {
  let component: GraduationProjectComponent;
  let fixture: ComponentFixture<GraduationProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduationProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduationProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
