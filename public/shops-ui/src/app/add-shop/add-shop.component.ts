import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ShopService } from '../service/shop.service';
import { Shop } from '../service/shop';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent implements OnInit {
  shop: Shop = new Shop('', '');//, 'category', 1234);
  submitted = false;

  constructor(private shopService: ShopService, private router: Router) { }

  addShop() {
    this.submitted = true;
    this.shopService.addOne(this.shop)
                .then(shop=>console.log(shop))
                .catch(error=>console.log('Error creating shop', error));
    this.router.navigate(['shops']);
  }
  ngOnInit(): void {

  }

}
