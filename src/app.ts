//our root app component
import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { HotKey } from './hotkey';


@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>To view Hotkey working, press ctl+shift+alt+i</h2>
    </div>
    

<dialog  id="myDialog">
    <div style="width: 600px; float: left;"> Debug Info:
    <br/>  
    <li>list any debugging info here... </li>
    <li>list any debugging info here... </li>
    <li>list any debugging info here... </li>
    </div>
    <button id="hide" (click)="HideDialog();">Hide</button>
</dialog>

  `,
})
export class App implements OnInit {

    keyMatch: string = "16+17+18+73"; // ctl+shift+alt+i
    debugModalDisplay: boolean = false;

    constructor(private hotkey: HotKey) { }

    ngOnInit() {

        this.hotkey.registerHotKey(this.keyMatch, () => {
            this.debugModalDisplay = true;
            let dialog = document.getElementById('myDialog');  
            dialog.showModal();  
            //this.context = !!this.dataContext.winParams ? this.dataContext.winParams : null;
        });
    }
    
    closeDebug(){
      this.debugModalDisplay = false;
    }
    HideDialog(){
      let dialog = document.getElementById('myDialog');  
        dialog.close();  
    }
}

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ App ],
  bootstrap: [ App ],
  providers: [ HotKey ]
})
export class AppModule {}
