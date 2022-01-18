import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogMedia } from 'src/app/interfaces';

@Component({
  selector: 'app-media-component',
  templateUrl: './media-component.component.html',
  styleUrls: ['./media-component.component.scss']
})
export class MediaComponentComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogMedia) {}

  ngOnInit(): void {
  }
}
