import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent {
  // Padre -> Hijo (mensaje que el padre le manda al hijo)
  @Input() message: string = '';

  // Hijo -> Padre (mensaje que el hijo le manda al padre)
  @Output() sendToParent = new EventEmitter<string>();

  childText: string = '';

  emitToParent() {
    const value = this.childText.trim();
    if (!value) return;

    this.sendToParent.emit(value);
    this.childText = '';
  }
}
