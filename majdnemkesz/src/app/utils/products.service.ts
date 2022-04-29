import { HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  datas : any = [];

  constructor(private http: HttpClient) {
    this.datas = {};
  }

  oderProducts(username: string | null, productId: string | null, productPrice: string | null, productName: string | null,  fullname: string | null, phonenumber: string | null, address: string | null, description: string | null,){
   console.log({username: username, productId: productId, productPrice: productPrice, productName:productName, fullname:fullname, phonenumber:phonenumber, address:address, description:description}, {responseType:'text'});

    return this.http.post('/api/order', {username: username, productId: productId, productPrice: productPrice, productName:productName, fullname:fullname, phonenumber:phonenumber, address:address, description:description}, {responseType:'text'} );
  }

  getProducts(){
    this.datas = this.http.get('/api/item' );
    console.log(this.datas);
    return this.datas;
  }

}

