import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:any
  id:0
  loading:boolean = false; 
    constructor(public myservice:ProductService , myroute:ActivatedRoute ){
      this.id = myroute.snapshot.params['id'];
    }
  ngOnInit(): void {
    this.myservice.getProductById(this.id).subscribe(
      {
        next:(data)=>{
          this.product = data;
        },
        error:(error)=>{
          console.log(error);
        }

      }
    );

  }

}
