import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { estadoDTO } from '../ModelDTO/estadoDTO';

@Injectable({
  providedIn: 'root',
})
export class EstadosService {
  //API
  private APIURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllEstados(): Observable<any> {
    return this.http.get<any>(this.APIURL + '/Estado/GetAllEstados');
  }

  getEstadoById(id: number): Observable<any> {
    return this.http.get<any>(this.APIURL + '/' + id);
  }

  saveEstado(estado: estadoDTO): Observable<any> {
    return this.http.post<any>(this.APIURL + '/Estado/SaveEstado/', estado);
  }

  updateEstado(estado: estadoDTO): Observable<any> {
    return this.http.put<any>(
      this.APIURL + '/Estado/UpdateEstado/' + estado.est_id,
      estado
    );
  }

  deleteEstado(id: number): Observable<any> {
    return this.http.delete<any>(this.APIURL + '/Estado/DeleteEstado/' + id);
  }
}
