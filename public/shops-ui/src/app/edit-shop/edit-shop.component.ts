import { ShopService } from '../service/shop.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Shop } from '../service/shop';
//import { Router } from 'express';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.css']
})
export class EditShopComponent implements OnInit {
  shop!: Shop;
  submitted = false;
  private shopId!: string;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  editShop() {
    this.submitted = true;
    this.shopService.editOne(this.shopId, this.shop)
                .then(data => this.shop = data)
                .catch(error => {
                  return{"message":"Error editing shop", error};
                });
    this.router.navigate(['shops']);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data =>{
      this.shopId = data['shopId'];
    });

    this.shopService.getOne(this.shopId)
                .then(data=>this.shop=data)
                .catch(error=> {
                  return {"message" : "Error reading shops"};
                });
  }

}
