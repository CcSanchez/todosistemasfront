import { Component, OnInit } from '@angular/core';
import { ActividadServiceService } from 'src/app/services/actividad-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CrearEditarActividadComponent } from 'src/app/crear-editar-actividad/crear-editar-actividad.component';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit {
  displayedColumns: string[] = ['nombreActividad', 'estado', 'fechaEstimada', 'diasRetraso', 'empleadoAsignado', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource()
  constructor(
    private actividadService: ActividadServiceService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerActividades();
  }
  async obtenerActividades() {
    try {
      let data = await this.actividadService.obtenerActividades().toPromise();
      this.dataSource.data = data;
      console.table(data);
    } catch (err) {
      console.log("error");

    }
  }

  async eliminar(id) {
    await this.actividadService.eliminarActividad(id).toPromise();
    this.obtenerActividades();
  }

  crearActividad() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      "editar": false
    };
    const dialogRef = this.dialog.open(CrearEditarActividadComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerActividades();
    });
  }

  actualizarActividad(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      "editar": true,
      "idEmpleado": data['idEmpleado'],
      "idEstado": data['idEstado'],
      "nombreActividad": data['nombreActividad'],
      "fecha": data['fecha'],
      "id": data['id'],
    };
    const dialogRef = this.dialog.open(CrearEditarActividadComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerActividades();
    });
  }

}
