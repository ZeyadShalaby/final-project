import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  base_url = "https://fakestoreapi.com/products";

  constructor(public myclient:HttpClient) { }

    getallproducts(){
      return this.myclient.get(this.base_url);
    }
  getProductById(id:any){
    return this.myclient.get(this.base_url+"/"+id);
  }
}
