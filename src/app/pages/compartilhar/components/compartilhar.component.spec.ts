import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartilharComponent } from './compartilhar.component';

describe('CompartilharComponent', () => {
  let component: CompartilharComponent;
  let fixture: ComponentFixture<CompartilharComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompartilharComponent]
    });
    fixture = TestBed.createComponent(CompartilharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
