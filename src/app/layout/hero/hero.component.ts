import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  template: `
    <section class="text-slate-medium">
      <div class="section-container">
        <div class="text-container">
          <h1 class="heading">
            Before they sold out <br class="hidden lg:inline-block" />ready made
            gluten
          </h1>
          <p class="sub-heading">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
          <div class="btn-container">
            <button class="btn">Discounts</button>
          </div>
        </div>
        <div class="image-container">
          <img class="image" alt="hero" src="assets/images/hero-img.svg" />
        </div>
      </div>
    </section>
  `,
  styleUrl: './hero.component.scss',
})
export default class HeroComponent {}
