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
    
    <div *ngIf="debugModalDisplay"  style="width: 100%; overflow: hidden; background-color: lightblue; padding: 20px 20px 20px 20px;">
    <div style="width: 600px; float: left;"> Debug Info:
    <br/>  
    <li>list any debugging info here... </li>
    <li>list any debugging info here... </li>
    <li>list any debugging info here... </li>
    </div>
    <div style="margin-left: 620px; "> <button (click)="closeDebug()">close</button> </div>
</div>
  `,
})
export class App implements OnInit {

    keyMatch: string = "16+17+18+73"; // ctl+shift+alt+i
    debugModalDisplay: boolean = false;

    constructor(private hotkey: HotKey) { }

    ngOnInit() {

        this.hotkey.registerHotKey(this.keyMatch, () => {
            this.debugModalDisplay = true;
            this.context = !!this.dataContext.winParams ? this.dataContext.winParams : null;
        });
    }
    
    closeDebug(){
      this.debugModalDisplay = false;
    }
}

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ App ],
  bootstrap: [ App ],
  providers: [ HotKey ]
})
export class AppModule {}