import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-tab-bar',
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './bottom-tab-bar.css',
  templateUrl: './bottom-tab-bar.html',
})
export class BottomTabBar {
  readonly moreOpen = signal(false);

  toggleMore() {
    this.moreOpen.update((v) => !v);
  }

  closeMore() {
    this.moreOpen.set(false);
  }
}
