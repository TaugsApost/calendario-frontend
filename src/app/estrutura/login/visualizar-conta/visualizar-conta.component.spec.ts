import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarContaComponent } from './visualizar-conta.component';

describe('VisualizarContaComponent', () => {
  let component: VisualizarContaComponent;
  let fixture: ComponentFixture<VisualizarContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarContaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
