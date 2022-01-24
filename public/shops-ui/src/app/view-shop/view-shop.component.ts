import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Shop } from './../service/shop';
import { ShopService } from '../service/shop.service';

@Component({
  selector: 'app-view-shop',
  templateUrl: './view-shop.component.html',
  styleUrls: ['./view-shop.component.css']
})
export class ViewShopComponent implements OnInit {

  shop!: Shop;
  private shopId!: string;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.shopId = data['shopId'];
    });

    this.shopService.getOne(this.shopId)
                .then(data=>this.shop = data)
                .catch(error=> {
                  return {"message" : "Error finding a shop", error};
                });
  }

}
