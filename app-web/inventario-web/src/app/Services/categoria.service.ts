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
    return this.http.get<any>(this.APIURL + '/Categoria/GetAllCategorias');
  }

  getCategoriaById(id: number): Observable<any> {
    return this.http.get<any>(this.APIURL + '/Categoria/' + id);
  }

  saveCategoria(estado: categoriaDTO): Observable<any> {
    return this.http.post<any>(
      this.APIURL + '/Categoria/SaveCategorias',
      estado
    );
  }

  updateCategoria(estado: categoriaDTO): Observable<any> {
    return this.http.put<any>(
      this.APIURL + '/Categoria/UpdateCategoria/' + estado.cat_id,
      estado
    );
  }

  deleteCategoria(id: number): Observable<any> {
    return this.http.delete<any>(
      this.APIURL + '/Categoria/DeleteCategoria/' + id
    );
  }
}
