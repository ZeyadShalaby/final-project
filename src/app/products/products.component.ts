import { Component, OnInit , Input } from '@angular/core';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() products:any ;
  cartProducts:any[]=[];
  addButton:boolean = false;

  constructor(public myservice:ProductService ){}
  ngOnInit(): void {
    this.myservice.getallproducts().subscribe(
          {
            next:(data)=>{
              this.products = data
            },
            error:(error)=>{
              console.log(error);
            }
          }
        );



  }
  addToCart(event:any){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let existItemINLocalstorage = this.cartProducts.find(item => item.item.id == event.item.id);
      if(existItemINLocalstorage){
        alert("this item already exists in your cart")
      }else{
        this.cartProducts.push(event);
        localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );
      }

    }else{
      this.cartProducts.push(event);
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );
    }

  }


}
