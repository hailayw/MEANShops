import { ActivatedRoute } from '@angular/router';
import { ShopService } from './../service/shop.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  private shopId!: string;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data =>{
      this.shopId = data['shopId'];
    });

    this.shopService.deleteOne(this.shopId)
                .then(data => console.log('Shop deleted successfuly!', data))
                .catch(error => {
                  return{"message":"Error deleting shop", error};
                });
  }
}
