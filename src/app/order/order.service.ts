import { Injectable } from '@angular/core';

import { ShoppingCartService } from '../restaurant-details/shopping-cart/shopping-cart.service';
import { CartItem } from '../restaurant-details/shopping-cart/cart-item.model';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';

import { MEAT_API } from 'app/app.api';

import { Order } from './order.model';

@Injectable()
export class OrderService {


  constructor(
    private cartService: ShoppingCartService,
    private http: Http
  ) {

  }

  clear() {
    this.cartService.clear();
  }

  checkOrder(order: Order): Observable<string> {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json')


    return this.http.post(`${MEAT_API}/orders`,
                          JSON.stringify(order),
                          new RequestOptions({ headers: headers }))
            .map(response => response.json())
            .map(responseOrder => responseOrder.id);
  }

  itemsValue(): number {
    return this.cartService.total();
  }

  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  emitIncreaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
  }

  emitDecreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
  }

  emitRemove(item: CartItem) {
    this.cartService.removeItem(item);
  }
}
