import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ShopService } from './../service/shop.service';
import { Shop } from '../service/shop';

@Component({
  selector: 'app-shop-items',
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.css']
})
export class ShopItemsComponent implements OnInit {

  shop!: Shop;
  private itemId!: string;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.itemId = data['shopId'];
    });
  }

}
