import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ColorSketchModule } from 'ngx-color/sketch';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbNavModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        ColorSketchModule,
        FormsModule,
        FlexLayoutModule,
        NgbNavModule,
        NgbPopoverModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
