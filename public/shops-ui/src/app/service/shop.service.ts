import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Shop } from './shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private _baseUrl = "http://localhost:4000/api/";

  constructor(private http: HttpClient) { }

  //Create
  addOne(shop : Shop): Promise<Shop>{
    return this.http.post(this._baseUrl + "shops", shop)
                      .toPromise().then(response => response as Shop)
                      .catch(this._handleError);
  }

  //Read
  getAll(): Promise<Shop[]> {
    return this.http.get(this._baseUrl + "shops").toPromise()
            .then(response => response as Shop[])
            .catch(this._handleError);
  }

  getOne(shopId: string): Promise<Shop> {
    return this.http.get(this._baseUrl + "shops/" + shopId).toPromise()
            .then(response => response as Shop)
            .catch(this._handleError);
  }

  //Update
  editOne(shopId: string, shop: Shop): Promise<Shop> {
    return this.http.put(this._baseUrl + "shops/"+ shopId, shop).toPromise()
            .then(response => response as Shop)
            .catch(this._handleError);
  }

  //Delete
  deleteOne(shopId: string) {
    console.log('deleting ... '+ this._baseUrl + "shops/" + shopId);

    return this.http.delete(this._baseUrl + "shops/" + shopId).toPromise()
            .then(result => console.log('Shop successfully deleted', result))
            .catch(this._handleError);
  }

  private _handleError(err: any): any {
    console.log('Service: Error finding shops ', err);
    return err;
  }

}
