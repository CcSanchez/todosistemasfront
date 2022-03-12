import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarActividadComponent } from './crear-editar-actividad.component';

describe('CrearEditarActividadComponent', () => {
  let component: CrearEditarActividadComponent;
  let fixture: ComponentFixture<CrearEditarActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEditarActividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
