import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  parentText: string = '';
  lastSentToChild: string = '';
  lastReceivedFromChild: string = '';

  showSimpsons = false;

  constructor(private router: Router) {}

  sendToChild() {
    const value = this.parentText.trim();
    if (!value) return;

    this.lastSentToChild = value;
    this.parentText = '';
  }

  onChildMessage(message: string) {
    this.lastReceivedFromChild = message;
  }

  openSimpsons() {
    this.showSimpsons = true;
    this.router.navigateByUrl('/simpsons');
  }

  closeSimpsons() {
    this.showSimpsons = false;
    this.router.navigateByUrl('/');
  }
}
