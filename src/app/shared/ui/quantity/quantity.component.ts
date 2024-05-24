import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

@Component({
  selector: 'app-quantity',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center space-x-2">
      <button
        [disabled]="quantity() === 1"
        (click)="updateQuantity('DECREMENT')"
        class="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-md hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50"
        id="decrement"
      >
        -
      </button>

      <input
        type="text"
        class="w-16 px-2 py-1 text-sm text-center border rounded-md focus:ring focus:ring-orange-500 focus:ring-opacity-50"
        [value]="quantity()"
        id="numberInput"
        readonly
      />

      <button
        (click)="updateQuantity('INCREMENT')"
        class="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-md hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50"
        id="increment"
      >
        +
      </button>
    </div>
  `,
})
export class QuantityComponent {
  quantity = input.required<number>();
  onChange = output<any>();

  updateQuantity(action: string): void {
    this.onChange.emit(action);
  }
}
/*

   if (this.product().quantity === 1) {
      // this.cartStore.removeItem(this.product().id);
    } else {
      this.cartStore.decrement(this.product().id);
    }

Cuando se hace clic por primera vez, en add to cart 
debe aparecer el quantity con 1 por defecto. 
Y el button de agregar al cart desaparece 


Podrá incrementar y decrementar 
Y tienes que actuazalir el total del cart 

Valor minimo es 1 - en la pagina de checkout si quiere 0 producto pues debe eliminarlo 
*/
