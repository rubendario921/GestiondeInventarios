import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { categoriaDTO } from '../ModelDTO/categoriaDTO';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  //API
  private APIURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllCategoria(): Observable<any> {
    return this.http.get<any>(this.APIURL + '/Estado/GetAllEstados');
  }

  getCategoriaById(id: number): Observable<any> {
    return this.http.get<any>(this.APIURL + '/Estado/' + id);
  }

  saveCategoria(estado: categoriaDTO): Observable<any> {
    return this.http.post<any>(this.APIURL + '/Estado/SaveEstado', estado);
  }

  updateCategoria(estado: categoriaDTO): Observable<any> {
    return this.http.put<any>(
      this.APIURL + '/Estado/UpdateEstado/' + estado.cat_id,
      estado
    );
  }

  deleteCategoria(id: number): Observable<any> {
    return this.http.delete<any>(this.APIURL + '/Estado/DeleteEstado/' + id);
  }
}
