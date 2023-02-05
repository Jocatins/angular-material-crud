import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiUrl = 'http://localhost:3000/productList/';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public postProduct(data: any) {
    return this.http.post<any>(apiUrl, data);
  }
  public getProducts() {
    return this.http.get<any>(apiUrl);
  }
  public putProducts(data: any, id: number) {
    return this.http.put<any>(`${apiUrl}/${id}`, data);
  }
  public deleteProduct(id: number) {
    return this.http.delete<any>(`${apiUrl}/${id}`);
  }
}
