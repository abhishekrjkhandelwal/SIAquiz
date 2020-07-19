import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomlistComponent } from './chatroomlist.component';

describe('ChatroomlistComponent', () => {
  let component: ChatroomlistComponent;
  let fixture: ComponentFixture<ChatroomlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatroomlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
