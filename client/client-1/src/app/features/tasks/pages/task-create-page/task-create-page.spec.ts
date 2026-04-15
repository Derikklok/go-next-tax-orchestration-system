import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreatePage } from './task-create-page';

describe('TaskCreatePage', () => {
  let component: TaskCreatePage;
  let fixture: ComponentFixture<TaskCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCreatePage],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreatePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
