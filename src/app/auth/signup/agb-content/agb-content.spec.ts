import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgbContent } from './agb-content';

describe('AgbContent', () => {
  let component: AgbContent;
  let fixture: ComponentFixture<AgbContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgbContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgbContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
