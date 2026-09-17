import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './components/top-bar/top-bar';
import { Footer } from './components/footer/footer';
import { NavbarComponent } from './components/navbar/navbar';
import { WhatsappBtn } from './components/whatsapp-btn/whatsapp-btn';
import { ThemeCustomizerComponent } from './components/theme-customizer/theme-customizer';
import { BottomTabBar } from './components/bottom-tab-bar/bottom-tab-bar';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TopBar,
    Footer,
    NavbarComponent,
    WhatsappBtn,
    ThemeCustomizerComponent,
    BottomTabBar
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('maharishi-kapi');
}

// Alias exports to prevent SSR and Vite bundle resolution failures
export { App as AppComponent };
export default App;