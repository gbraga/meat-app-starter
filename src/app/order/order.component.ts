import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-details/shopping-cart/cart-item.model';

import { Order, OrderItem } from './order.model'
import { Router } from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery = 8;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de débito', value: 'DEB' },
    { label: 'Cartão de refeição', value: 'REF' }
  ];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
    .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));

    this.orderService.checkOrder(order)
    .subscribe((orderId: string) => {
      console.log(`Compra concluída: ${orderId}`);

      this.orderService.clear();
      this.router.navigate(['/order-sumary']);
    });
    console.log(order);
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.emitIncreaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.emitDecreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.emitRemove(item);
  }
}
