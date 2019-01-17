import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersViewPage } from './customers-view.page';

describe('CustomersViewPage', () => {
  let component: CustomersViewPage;
  let fixture: ComponentFixture<CustomersViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
