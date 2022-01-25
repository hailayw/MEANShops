import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ShopService } from '../service/shop.service';
import { Shop } from '../service/shop';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  shopName!: string;
  private shopId!: string;

  shops: Shop[] = [];
  page : number = 1;
  constructor(private shopService : ShopService, private activatedRoute: ActivatedRoute ) { }

  _getAll() {
    this.shopService.getAll()
            .then(res => this.shops = res)
            .catch(error => {
              return {"message" : "Error finding shops ", error};
            });
  }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(data =>{
            this.shopId = data['shopId'];
    })
    this._getAll();
  }

  search() {
    if(this.shopName == "") {
      this.ngOnInit();
    } else{
      this.shops = this.shops.filter(shop => shop.name.toLocaleLowerCase().match(this.shopName.toLocaleLowerCase()));
    }
  }

  deleteShop(shopId: String) {
    if(!this.shopId) {
      this.ngOnInit();
    }
    console.log('delete called for shopId '+ this.shopId);

    this.shopService.deleteOne(this.shopId)
            .then(data => console.log('deleted successfuly!', data))
            .catch(error => console.log('error deleting iteme', error));
    //update list
    this._getAll();
      //this.shops = this.shops.filter(shop => !shop._id?.match(this.shopId));
    }

  // key: string = 'name';
  // reverse: boolean = false;
  // sort(key) {
  //   this.key = key;
  //   this.reverse = !this.reverse;
  // }

}
