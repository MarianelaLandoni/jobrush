import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationFormComponent } from './add-application-form.component';

describe('AddApplicationFormComponent', () => {
  let component: AddApplicationFormComponent;
  let fixture: ComponentFixture<AddApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddApplicationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
