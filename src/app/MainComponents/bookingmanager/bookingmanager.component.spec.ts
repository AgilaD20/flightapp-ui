import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingmanagerComponent } from './bookingmanager.component';

describe('BookingmanagerComponent', () => {
  let component: BookingmanagerComponent;
  let fixture: ComponentFixture<BookingmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingmanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
