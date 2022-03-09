import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupModalComponent } from 'src/app/components/media-component/media-component.component';
import { DIALOG_TYPE } from 'src/app/constants';
import { DialogData } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DialogModalService {
  // Data for either media or description dialog modal
  data: DialogData = {} as DialogData;

  constructor(public dialog: MatDialog) { }

  // Opens modal that will either display the media or just the title and description
   openModal(data: DialogData): void {
      this.dialog.open(PopupModalComponent, { data: data });
   }

   // Open modal that will display the error
   openErrorModal(error: Error): void {
      this.dialog.open(PopupModalComponent, { data: 
         {
            type: DIALOG_TYPE.ERROR,
            data: {
               explanation: "An unexpected error has occured. NASA's API may be undergoing some maintenance, or you might not be connected to the internet.\n" + `Failed: ${error.message}`,
               title: "Error Retrieving Posts",
               url: ""
            }
           }
      });
   }
}
