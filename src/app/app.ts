import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './components/top-bar/top-bar';
import { Footer } from './components/footer/footer';
import { NavbarComponent } from './components/navbar/navbar';
import { WhatsappBtn } from './components/whatsapp-btn/whatsapp-btn';
import { ThemeCustomizerComponent } from './components/theme-customizer/theme-customizer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TopBar,Footer,NavbarComponent,WhatsappBtn,ThemeCustomizerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('maharishi-kapi');
}
