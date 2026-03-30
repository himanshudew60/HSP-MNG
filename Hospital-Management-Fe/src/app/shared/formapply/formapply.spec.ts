import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formapply } from './formapply';

describe('Formapply', () => {
  let component: Formapply;
  let fixture: ComponentFixture<Formapply>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formapply]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formapply);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
