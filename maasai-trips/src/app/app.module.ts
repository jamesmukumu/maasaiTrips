import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card'
import {MatSidenavModule} from "@angular/material/sidenav"
import { IiComponent } from './components/ii/ii.component';
import { MatDividerModule } from '@angular/material/divider';
import { HeaderComponent } from './components/header/header.component';
import {MatExpansionModule} from '@angular/material/expansion'
import {MatListModule } from '@angular/material/list'
import {MatButtonModule} from "@angular/material/button"

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule} from "@angular/material/icon";
import { HomeComponent } from './pages/home/home.component';
import { OverviewComponent } from './components/overview/overview.component';
import { FrequentQuestComponent } from './components/frequent-quest/frequent-quest.component';
import { FooterComponent } from './components/footer/footer.component';
import { SafarisComponent } from './pages/safaris/safaris.component'
  


@NgModule({
  declarations: [AppComponent, IiComponent,HeaderComponent, HomeComponent, OverviewComponent, FrequentQuestComponent, FooterComponent, SafarisComponent],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
  
 MatSidenavModule,
    RouterModule.forRoot([
      {
      component:HomeComponent,
      path:""
      },
      {
      path:"safaris",
component:SafarisComponent
      }
    ]),
    MatExpansionModule,
    MatCardModule
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
