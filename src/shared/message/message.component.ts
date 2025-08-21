import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageRequest } from '../../app/core/models/Message';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss', './icon-message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessageRequest,
  ) { }

  ngOnInit(): void {
    this.closeTiming();
  }

  close(value: boolean = false): void{
    this.dialogRef.close(value);
  }

  closeTiming(): void{
    if(this.data.timing != null){
      setTimeout(() => {
        this.close();
      }, this.data.timing);
    }
  }
}
