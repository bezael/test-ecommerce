import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-quantity',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex-center-space">
      <button
        [disabled]="quantity() === 1"
        (click)="updateQuantity('DECREMENT')"
        class="btn"
        id="decrement"
      >
        -
      </button>

      <input
        type="text"
        class="input"
        [value]="quantity()"
        id="numberInput"
        readonly
      />

      <button (click)="updateQuantity('INCREMENT')" class="btn" id="increment">
        +
      </button>
    </div>
  `,
  styleUrl: './quantity.component.scss',
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
