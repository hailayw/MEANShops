import { Router, ActivatedRoute } from '@angular/router';
import { ShopService } from '../service/shop.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-shop',
  templateUrl: './delete-shop.component.html',
  styleUrls: ['./delete-shop.component.css']
})
export class DeleteShopComponent implements OnInit {
  private shopId!: string;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data =>{
      this.shopId = data['shopId'];
    });

    this.shopService.deleteOne(this.shopId)
                .then(data => console.log('Shop deleted successfuly!', data))
                .catch(error => {
                  return{"message":"Error deleting shop", error};
                });
    this.router.navigate(['shops']);
  }
}
