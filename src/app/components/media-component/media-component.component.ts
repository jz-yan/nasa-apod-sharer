import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DIALOG_TYPE } from 'src/app/constants';
import { DialogData } from 'src/app/interfaces';

@Component({
  selector: 'app-media-component',
  templateUrl: './media-component.component.html',
  styleUrls: ['./media-component.component.scss']
})
export class PopupModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {}

  get isImage(): boolean {
     return this.data.type === DIALOG_TYPE.IMAGE;
  }
}