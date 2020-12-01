import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartDailyComponent } from './line-chart-daily.component';

describe('LineChartDailyComponent', () => {
  let component: LineChartDailyComponent;
  let fixture: ComponentFixture<LineChartDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
