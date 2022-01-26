import { ShopService } from './service/shop.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { AddShopComponent } from './add-shop/add-shop.component';
import { EditShopComponent } from './edit-shop/edit-shop.component';
import { ViewShopComponent } from './view-shop/view-shop.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ShopsComponent } from './shops/shops.component';
import { FooterComponent } from './footer/footer.component';
import { ShopItemsComponent } from './shop-items/shop-items.component';
import { VowelRemoverPipe } from './vowel-remover.pipe';
import { TakeFirstlettersPipe } from './takeFirstletters.pipe';
import { ChildComponent } from './child/child.component';
import { DeleteShopComponent } from './delete-shop/delete-shop.component';

@NgModule({
  declarations: [
    AppComponent,
    AddShopComponent,
    EditShopComponent,
    ViewShopComponent,
    NavigationComponent,
    HomeComponent,
    ShopsComponent,
    FooterComponent,
    DeleteShopComponent,
    ShopItemsComponent,
    VowelRemoverPipe,
    TakeFirstlettersPipe,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot([
      {
        path: '', redirectTo: 'shops', pathMatch: 'full'
      },
      {
        path: 'shops', component: ShopsComponent
      },
      {
        path: 'shops/add-new', component: AddShopComponent
      },
      {
        path: 'shops/edit/:shopId', component: EditShopComponent
      },
      {
        path: 'shops/view/:shopId', component: ViewShopComponent
      },
      {
        path: 'shops/view/:shopId/items', component: ShopItemsComponent
      },
      {
        path: 'shops/delete/:shopId', component: DeleteShopComponent
      }
    ])
  ],
  providers: [ShopService],
  bootstrap: [AppComponent]
})
export class AppModule {}
