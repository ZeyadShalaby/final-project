import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private myservice:CartService){}
  total:any = 0
  items:any = 0
  message ='';
  ngOnInit(): void {
    this.getCartProducts();
  }

cartProducts:any[] = []


  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    this.getCartTotal();
    this.getCartItemsNumber();
  }

  getCartTotal(){
    this.total = 0;
    for(let x in this.cartProducts){
        this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity
    }
  }

  getCartItemsNumber(){
    this.items = 0;
    for(let x in this.cartProducts){
      this.items += this.cartProducts[x].quantity
    }
  }

  addamount(index:number){
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    this.items++
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );
  }
  minusamount(index:number){
    if(this.cartProducts[index].quantity>0){
    this.cartProducts[index].quantity--;
    this.items--
    }else{
      alert("there's no products to minus")
    }
    this.getCartTotal();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );
  }
  // detectChange(){
  //   this.getCartTotal();
  //   this.getCartItemsNumber();
  //   localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );
  // }

  deleteProduct(index:number){
    this.cartProducts.splice(index , 1);
    this.getCartTotal();
    this.getCartItemsNumber();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );
  }

  clearCart(){
    this.cartProducts = [];
    this.getCartTotal();
    this.getCartItemsNumber();
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts) );

  }

  addCart(){
    let products = this.cartProducts.map(item=>{

        return {productId:item.item.id , quantity:item.quantity}
        // products.product_id

    })
    let Model = {
      // order_id:5646546575,
      userId: 5,
      date:new Date(),
      products:products
    }
    this.myservice.createNewCart(Model).subscribe(
      {

        next:(data)=>{
          this.message = 'Your order is successfully Done';
          console.log(data);

        }
      }
    )
      this.clearCart();


  }

  address(data:{address: string, city:string, contactinfo:string}){
    let user = localStorage.getItem('user');
  
  }



  applyCouponCode(){

    let coupon = 0.15;
    //replace the zero with the value of the coupon code from admin page whatever it is
    for(let x in this.cartProducts){
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity * coupon;
  }

  }




  
}


// this.items = this.items - this.cartProducts[index].quantity;

