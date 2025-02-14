import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastOrdersModalComponent } from './past-orders-modal.component';

describe('PastOrdersModalComponent', () => {
  let component: PastOrdersModalComponent;
  let fixture: ComponentFixture<PastOrdersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastOrdersModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastOrdersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
