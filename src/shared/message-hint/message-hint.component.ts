import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MessageRequest } from '../../app/core/models/message';

@Component({
  selector: 'message-hint',
  standalone: true,
  imports: [
    NgClass,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './message-hint.component.html',
  styleUrls: ['./message-hint.component.scss']
})
export class MessageHintComponent implements OnInit {

  @Input('messagem') messageGiven!: MessageRequest;

  @Input() checkView!: boolean;
  @Output() checkViewChange = new EventEmitter<boolean>();

  @Output('clickLink') emitClickLinkChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {}
}
