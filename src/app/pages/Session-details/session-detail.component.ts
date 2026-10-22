import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-detail.component.html',
})
export class SessionDetailComponent implements OnInit {
  session: any = null;
  displayTimeline: { time: string; title: string; desc: string }[] = [];

  private router = inject(Router);
  private location = inject(Location);

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.session = navigation?.extras?.state?.['session'];
  }

  ngOnInit() {
    if (!this.session) {
      this.router.navigate(['/services']);
      return;
    }

    // नया timeline ऐरे इस्तेमाल करें, अगर वो नहीं है तो पुराने steps को पार्स करें
    if (this.session.timeline && this.session.timeline.length > 0) {
      this.displayTimeline = this.session.timeline;
    } else if (this.session.steps && this.session.steps.length > 0) {
      this.displayTimeline = this.session.steps.map((step: string) => {
        const [timePart, rest] = step.split(' · ');
        const [titlePart, descPart] = (rest || '').split(': ');
        return {
          time: timePart?.trim() || '',
          title: titlePart?.trim() || rest?.trim() || '',
          desc: descPart?.trim() || ''
        };
      });
    }
  }

  goBack() {
    this.location.back();
  }
}