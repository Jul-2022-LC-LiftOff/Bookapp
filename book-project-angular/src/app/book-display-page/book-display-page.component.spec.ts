import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDisplayPageComponent } from './book-display-page.component';

describe('BookDisplayPageComponent', () => {
  let component: BookDisplayPageComponent;
  let fixture: ComponentFixture<BookDisplayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDisplayPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
