import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CLanguageComponent } from './c-language.component';

describe('CLanguageComponent', () => {
  let component: CLanguageComponent;
  let fixture: ComponentFixture<CLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
