import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {ToastModule} from "primeng/toast"
import {MatCardModule} from '@angular/material/card'
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollTopModule } from 'primeng/scrolltop';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatMenuModule} from "@angular/material/menu"
import {MatSidenavModule} from "@angular/material/sidenav"
import {MatSnackBarModule} from "@angular/material/snack-bar"
import { IiComponent } from './components/ii/ii.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { HeaderComponent } from './components/header/header.component';
import {ButtonModule} from "primeng/button"
import {MatExpansionModule} from '@angular/material/expansion'
import { AccordionModule } from 'primeng/accordion';
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
import { DropdownModule } from 'primeng/dropdown';
import { GoogleMapsModule } from '@angular/google-maps';
import {ProgressBarModule} from "primeng/progressbar";
import { PatnersComponent } from './components/patners/patners.component';
import { EnquiriesComponent } from './pages/enquiries/enquiries.component'
import {MatTableModule} from "@angular/material/table"
import { enquiryReducer } from './redux/reducers/editEnquiry.reducer';
import {StoreModule,ActionReducer,ActionReducerMap,MetaReducer} from "@ngrx/store"
import { localStorageSync } from 'ngrx-store-localstorage';
import { EditEnquiryComponent } from './components/edit-enquiry/edit-enquiry.component';
import { DeleteInquiryComponent } from './components/delete-inquiry/delete-inquiry.component';
import { SignupComponent } from './admins/pages/signup/signup.component';
import { SigninComponent } from './admins/pages/signin/signin.component';
import { HeaderAddComponent } from './admins/components/header-add/header-add.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RequestResetComponent } from './components/request-reset/request-reset.component';



const reducers:ActionReducerMap<any> = {
  enquiry:enquiryReducer
  }
  export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
      if (typeof window !== 'undefined') {
        return localStorageSync({ keys: ['enquiry'], rehydrate: true })(reducer)(state, action);
      }
      return reducer(state, action);
    };
  }
  
  
  const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
@NgModule({
  declarations: [AppComponent, IiComponent,HeaderComponent, HomeComponent, OverviewComponent, FrequentQuestComponent, FooterComponent, SafarisComponent, QuotationsComponent, AccomodationsComponent, HotelsComponent, PatnersComponent, EnquiriesComponent, EditEnquiryComponent, DeleteInquiryComponent, SignupComponent, SigninComponent, HeaderAddComponent, NotFoundComponent, VerifyEmailComponent, ResetPasswordComponent, RequestResetComponent, ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,      
    ButtonModule,
    MatDatepickerModule,
    MatTableModule,
    MatDialogModule,
    MatListModule,
    GoogleMapsModule,
    AccordionModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    ScrollTopModule,
    ProgressSpinnerModule,
    ToastModule,
  SidebarModule,
 MatSidenavModule,   
 MatMenuModule,
 GalleriaModule,
 DropdownModule,
 StoreModule.forRoot(reducers,{metaReducers}) , 
ProgressBarModule,
MatTooltipModule,
 MatInputModule,
    RouterModule.forRoot([

      
      {
        component:HotelsComponent,
        path:"hotel/:hotelId"
      },
      {
      component:VerifyEmailComponent,
      path:"verify/email/:token"
      },
      {
      component:HomeComponent,
      path:""
      },
      
      {
        path:"register",
        component:SignupComponent
      },
      {
      path:"login",
      component:SigninComponent
      },
      
      {
      path:"safaris",
component:SafarisComponent
      },
      {
      path:"enquiries",
      component:EnquiriesComponent
      },
      {
      component:AccomodationsComponent,
      path:"accomodations"
      },
      {
        path:"**",
        component:NotFoundComponent
      },
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
