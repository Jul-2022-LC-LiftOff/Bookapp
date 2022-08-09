import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReviewPageComponent } from './book-review-page.component';

describe('BookReviewPageComponent', () => {
  let component: BookReviewPageComponent;
  let fixture: ComponentFixture<BookReviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookReviewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
