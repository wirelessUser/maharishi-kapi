import { Component } from '@angular/core';
import { HeroSection } from '../../components/hero-section/hero-section';
import { Stats } from '../../components/stats/stats';
import { Legacy } from '../../components/legacy/legacy';
import { Roles } from '../../components/roles/roles';
import { Journey } from '../../components/journey/journey';
import { Immersive } from '../../components/immersive/immersive';
import { Consultation } from '../../components/consultation/consultation';
import { Downloads } from '../../components/downloads/downloads';
import { Stories } from '../../components/stories/stories';
import { Instagram } from '../../components/instagram/instagram';

@Component({
  imports:  [HeroSection,Stats,Legacy,Roles,Journey,Immersive,Consultation
    ,Downloads,Stories,Instagram],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
