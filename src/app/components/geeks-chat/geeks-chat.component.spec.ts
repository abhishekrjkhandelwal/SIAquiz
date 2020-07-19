import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeeksChatComponent } from './geeks-chat.component';

describe('GeeksChatComponent', () => {
  let component: GeeksChatComponent;
  let fixture: ComponentFixture<GeeksChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeeksChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeeksChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
