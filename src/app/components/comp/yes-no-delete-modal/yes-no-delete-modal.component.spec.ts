import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoDeleteModalComponent } from './yes-no-delete-modal.component';

describe('YesNoDeleteModalComponent', () => {
  let component: YesNoDeleteModalComponent;
  let fixture: ComponentFixture<YesNoDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesNoDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
