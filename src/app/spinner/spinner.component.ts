import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContextColor, DEFAULT_SPINNER_TIMEOUT} from "../constants";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() message: string;
  @Input() timeout: number;
  @Input() color: ContextColor;
  displaySpinner = true;
  colorClass: string;
  timeoutRef: any;
  @Output() dismiss: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    this.timeout = !!this.timeout ? this.timeout : DEFAULT_SPINNER_TIMEOUT;
    this.colorClass = !!this.color ? 'text-' + this.color : '';
    this.message = !!this.message ? this.message : 'Loading';
    this.timeoutRef = setTimeout(() => {
      this.displaySpinner = false;
    }, this.timeout * 1000);
  }

  close() {
    this.dismiss.emit();
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutRef);
  }
}
