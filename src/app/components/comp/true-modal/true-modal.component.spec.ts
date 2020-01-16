import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueModalComponent } from './true-modal.component';

describe('TrueModalComponent', () => {
  let component: TrueModalComponent;
  let fixture: ComponentFixture<TrueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrueModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
