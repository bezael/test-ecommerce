import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="text-slate-600 body-font">
      <div
        class="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center"
      >
        <div
          class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
        >
          <h1
            class="max-w-xl text-[2.2rem] leading-none text-slate-900 font-extrabold font-sans text-center md:text-5xl lg:text-left lg:leading-tight mb-5"
          >
            Before they sold out <br class="hidden lg:inline-block" />readymade
            gluten
          </h1>
          <p class="mb-8 leading-relaxed">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
          <div class="flex w-1/4">
            <button
              class="w-full text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-700 rounded text-lg"
            >
              Discounts
            </button>
          </div>
        </div>
        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            class="object-cover object-center rounded"
            alt="hero"
            src="assets/images/hero-img.svg"
          />
        </div>
      </div>
    </section>
  `,
})
export default class HeroComponent {}
