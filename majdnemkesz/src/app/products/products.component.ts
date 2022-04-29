import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  datas : any = [];

  constructor(private http: HttpClient) {
    this.datas = {};
  }

  productAdd(name: string, piece: number, price: number, description: string, picture: string) {
    return this.http.post( '/api/item', {
      name: name,
      piece: piece,
      price: price,
      description: description,
      picture: picture
    }, {responseType: 'text'});
  }

  getProducts() {

    this.http.get( '/api/item').subscribe((res)=>{
      this.datas = res
      console.log(this.datas)
    })

    return this.datas;
  }



  ngOnInit(): void {
    this.getProducts();
  }


}


/*
import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  datas : any[] = [];

  constructor(private http: HttpClient) {
    this.datas = [{}];
  }

  productAdd(name: string, piece: number, price: number, description: string, picture: string) {
    return this.http.post( '/api/item', {
      name: name,
      piece: piece,
      price: price,
      description: description,
      picture: picture
    }, {responseType: 'text'});
  }

  getProducts() {

    this.http.get( '/api/item').subscribe((res)=>{
      this.datas.push(res)
      console.log(this.datas)
    })

    return this.datas;
  }



  ngOnInit(): void {
    this.getProducts();
  }


}

*/