import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Access-Control-Allow-Methods', '*');

@Injectable({
  providedIn: 'root'
})
export class ParametroServiceService {

  constructor(private http: HttpClient) { }

  obtenerEstados(): Observable<any> {
    return this.http.get(`${environment.urlService}parametros/estados`, { 'headers': headers });
  }

  obtenerEmpleados(): Observable<any> {
    return this.http.get(`${environment.urlService}parametros/empleados`, { 'headers': headers });
  }
}
