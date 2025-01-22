import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverflowMenuComponent } from './overflow-menu.component';

describe('OverflowMenuComponent', () => {
  let component: OverflowMenuComponent;
  let fixture: ComponentFixture<OverflowMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverflowMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverflowMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
