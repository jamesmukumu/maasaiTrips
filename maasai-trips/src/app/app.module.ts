import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatSidenavModule} from "@angular/material/sidenav"
import { IiComponent } from './components/ii/ii.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { HeaderComponent } from './components/header/header.component';
import {MatExpansionModule} from '@angular/material/expansion'
import {MatInputModule} from '@angular/material/input'
import {MatListModule } from '@angular/material/list'
import {MatButtonModule} from "@angular/material/button"
import {SidebarModule} from "primeng/sidebar"
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule} from "@angular/material/icon";
import { HomeComponent } from './pages/home/home.component';
import { OverviewComponent } from './components/overview/overview.component';
import { FrequentQuestComponent } from './components/frequent-quest/frequent-quest.component';
import { FooterComponent } from './components/footer/footer.component';
import { SafarisComponent } from './pages/safaris/safaris.component';
import { QuotationsComponent } from './components/quotations/quotations.component'
import { FormsModule } from '@angular/forms';
import { AccomodationsComponent } from './pages/accomodations/accomodations.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import {GalleriaModule} from 'primeng/galleria'
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import {ProgressBarModule} from "primeng/progressbar";
import { PatnersComponent } from './components/patners/patners.component'
@NgModule({
  declarations: [AppComponent, IiComponent,HeaderComponent, HomeComponent, OverviewComponent, FrequentQuestComponent, FooterComponent, SafarisComponent, QuotationsComponent, AccomodationsComponent, HotelsComponent, PatnersComponent],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    BrowserAnimationsModule,
    
    MatIconModule,      
    MatDatepickerModule,
    MatDialogModule,
    MatListModule,
    GoogleMapsModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
  SidebarModule,
 MatSidenavModule,   
 GalleriaModule,  

ProgressBarModule,
 MatInputModule,
    RouterModule.forRoot([
      {
        component:HotelsComponent,
        path:"hotel/:hotelId"
      },
      {
      component:HomeComponent,
      path:""
      },
      
      {
      path:"safaris",
component:SafarisComponent
      },
      {
      component:AccomodationsComponent,
      path:"accomodations"
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
