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
  count = 1;
  key!: string;
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
      this.shops = this.shops.filter(shop => shop.name.toLowerCase().match(this.shopName.toLowerCase()));
    }
  }

  onEnter(key: string) {
    this.shops = this.shops.filter(shop => shop.name.toLowerCase().match(key.toLowerCase()));
    console.log("Enter pressed", this.shops);

  }
}
