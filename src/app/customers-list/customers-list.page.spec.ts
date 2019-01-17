import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersListPage } from './customers-list.page';

describe('CustomersListPage', () => {
  let component: CustomersListPage;
  let fixture: ComponentFixture<CustomersListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
