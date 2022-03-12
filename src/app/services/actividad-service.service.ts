import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Access-Control-Allow-Methods', '*');

@Injectable({
  providedIn: 'root'
})
export class ActividadServiceService {

  constructor(private http: HttpClient) { }

  obtenerActividades(): Observable<any> {
    return this.http.get(`${environment.urlService}actividades/`, { 'headers': headers });
  }

  eliminarActividad(id): Observable<any> {
    return this.http.delete(`${environment.urlService}actividades/${id}`, { 'headers': headers });
  }

  crearActividad(data): Observable<any> {
    return this.http.post(`${environment.urlService}actividades`, data, { 'headers': headers });
  }

  actualizarActividad(data): Observable<any> {
    return this.http.put(`${environment.urlService}actividades/${data['id']}`, data, { 'headers': headers });
  }
}
