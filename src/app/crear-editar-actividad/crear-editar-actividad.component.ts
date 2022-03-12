import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { toASCII } from 'punycode';
import { ActividadServiceService } from '../services/actividad-service.service';
import { ParametroServiceService } from '../services/parametro-service.service';

@Component({
  selector: 'app-crear-editar-actividad',
  templateUrl: './crear-editar-actividad.component.html',
  styleUrls: ['./crear-editar-actividad.component.scss']
})
export class CrearEditarActividadComponent implements OnInit {
  form: FormGroup;
  estados;
  empleados;
  data;
  constructor(
    private dialogRef: MatDialogRef<CrearEditarActividadComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private _formBuilder: FormBuilder,
    private parametroServiceService: ParametroServiceService,
    private actividadService: ActividadServiceService
  ) {
    this.data = data;
  }


  ngOnInit(): void {
    this.obtenerEmpleados();
    this.obtenerEstados();
    this.form = new FormGroup({
      nombreActividad: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      empleado: new FormControl('', Validators.required),
    })
    this.setearDatos();
  }

  setearDatos() {
    if (this.data['editar']) {
      this.form.get("nombreActividad").setValue(this.data['nombreActividad'])
      this.form.get("estado").setValue(this.data['idEstado'])
      this.form.get("fecha").setValue(new Date(this.data['fecha']))
      this.form.get("empleado").setValue(this.data['idEmpleado'])
    }
  }

  async obtenerEmpleados() {
    try {
      this.empleados = await this.parametroServiceService.obtenerEmpleados().toPromise();
      console.log(this.empleados);

    } catch (error) {
      console.log(error);
    }
  }

  async obtenerEstados() {
    try {
      this.estados = await this.parametroServiceService.obtenerEstados().toPromise();
      console.log(this.estados);

    } catch (error) {
      console.log(error);
    }
  }

  accion() {
    if (this.data['editar']) {
      this.actualizarActividad();
    } else {
      this.crearActividad();
    }
  }

  async crearActividad() {
    let json = {
      "empleadoAsignado": this.form.get("empleado").value,
      "estado": this.form.get("estado").value,
      "fechaIngreso": this.form.get("fecha").value,
      "nombreActividad": this.form.get("nombreActividad").value
    }
    let data = await this.actividadService.crearActividad(json).toPromise();
    console.log(data);
    this.dialogRef.close();
  }

  async actualizarActividad() {
    let json = {
      "id": this.data['id'],
      "empleadoAsignado": this.form.get("empleado").value,
      "estado": this.form.get("estado").value,
      "fechaIngreso": this.form.get("fecha").value,
      "nombreActividad": this.form.get("nombreActividad").value
    }
    console.log(json);
    
    console.log(json);
    let data = await this.actividadService.actualizarActividad(json).toPromise();
    console.log(data);
    this.dialogRef.close();
  }

}
