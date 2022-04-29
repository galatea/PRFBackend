import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-moredetail',
  templateUrl: './moredetail.component.html',
  styleUrls: ['./moredetail.component.css']
})
export class MoredetailComponent implements OnInit {
  productId: string | null;
  datas : any = [];
  constructor(private _Activatedroute: ActivatedRoute, private http: HttpClient) {
    this.productId = "";
  }

  sub: any;

  ngOnInit() {

    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.productId = params.get('id');
      // let products=this._productService.getProducts();
      // this.product=products.find(p => p.productID==this.id);
    });


    this.http.get('/api/item').subscribe((res)=>{
      this.datas = res
      console.log(this.datas)
    })

    return this.datas;
  }
}


