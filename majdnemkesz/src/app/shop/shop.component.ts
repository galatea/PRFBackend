import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ProductsService} from "../utils/products.service";
import {LoginService} from "../utils/login.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  productId: string | null;
  productPrice: string | null;
  productName: string | null;
  fullname: string | null;
  phonenumber: string | null;
  address: string | null;
  description: string | null;

  datas : any = [];
  constructor(private _Activatedroute: ActivatedRoute, private http: HttpClient, private productsService: ProductsService, private router: Router) {
    this.productId = "";
    this.productPrice = "";
    this.productName = "";
    this.fullname = "";
    this.phonenumber = "";
    this.address = "";
    this.description = "";
  }

  sub: any;

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params.get('id'));
      console.log(params.get('name'));
      console.log(params.get('price'));
      console.log(localStorage.getItem('user'));

      this.productId = params.get('id');
      this.productPrice = params.get('price');
      this.productName = params.get('name');

      // let products=this._productService.getProducts();
      // this.product=products.find(p => p.productID==this.id);
    });
  }

  send(){
    if(this.productId != '' &&  this.productPrice != '' && this.productName != '' && this.fullname != '' && this.phonenumber != '' && this.address != ''){
      this.productsService.oderProducts(localStorage.getItem('user'), this.productId, this.productPrice, this.productName,   this.fullname,this.phonenumber, this.address, this.description).subscribe(msg => {
        console.log(msg);
        this.router.navigate(['/api/products'])
      }, error => {
        console.log(error);
      })
    }  }

}
