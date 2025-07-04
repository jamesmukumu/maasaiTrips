import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { userStatusReducer } from './redux/reducers/userStatus.reducer';
import { AppComponent } from './app.component';
import {MatBadgeModule} from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import {ToastModule} from "primeng/toast"
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table'; 
import {MatStepperModule} from '@angular/material/stepper';
import { EditorModule } from 'primeng/editor';
import {MatCardModule} from '@angular/material/card'
import {ClipboardModule} from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { ScrollTopModule } from 'primeng/scrolltop';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatSelectModule } from '@angular/material/select';
import { DialogModule } from 'primeng/dialog';
import {MatMenuModule} from "@angular/material/menu"
import {MatSidenavModule} from "@angular/material/sidenav"
import {MatSnackBarModule} from "@angular/material/snack-bar"
import { TagModule } from 'primeng/tag';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HeaderComponent } from './components/header/header.component';
import {ButtonModule} from "primeng/button"
import { BreadcrumbModule } from 'angular-crumbs';
import {ImageModule} from "primeng/image"
import {JoditAngularModule} from 'jodit-angular'
import {MatExpansionModule} from '@angular/material/expansion'
import { AccordionModule } from 'primeng/accordion';
import {MatInputModule} from '@angular/material/input'
import {MatListModule } from '@angular/material/list'
import {MatButtonModule} from "@angular/material/button"
import {SidebarModule} from "primeng/sidebar"
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule} from "@angular/material/icon";
import { HomeComponent } from './pages/home/home.component';
import { TabViewModule } from 'primeng/tabview';
import { OverviewComponent } from './components/overview/overview.component';
import { FrequentQuestComponent } from './components/frequent-quest/frequent-quest.component';
import { FooterComponent } from './components/footer/footer.component';
import { SafarisComponent } from './pages/safaris/safaris.component';
import { QuotationsComponent } from './components/quotations/quotations.component'
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from "@angular/material/checkbox"
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
import { DashboardComponent } from './admins/pages/dashboard/dashboard.component';
import { EmailsSendComponent } from './admins/components/emails-send/emails-send.component';
import { FileUploadModule } from 'primeng/fileupload';
import { NewEmailComponent } from './admins/components/email/new-email/new-email.component';
import {MatChipsModule} from "@angular/material/chips";
import { BulkMailsComponent } from './admins/components/email/bulk-mails/bulk-mails.component';
import { NewBulkAddComponent } from './admins/components/email/new-bulk-add/new-bulk-add.component'
import { previewReducer } from './redux/reducers/preview.reducer';
import {bulkReducer } from './redux/reducers/bulk.reducer';
import { UpdateBulkComponent } from './admins/components/email/update-bulk/update-bulk.component';
import { DeleteBulkComponent } from './admins/components/email/delete-bulk/delete-bulk.component';
import { NewsLetterComponent } from './admins/components/email/news-letter/news-letter.component';
import { QueueComponent } from './admins/components/email/queue/queue.component';
import { ManageMailsComponent } from './admins/components/email/manage-mails/manage-mails.component';
import { ManageNewslettersComponent } from './admins/components/email/manage-newsletters/manage-newsletters.component';
import { PreviewComponent } from './admins/components/email/preview/preview.component'
import {MatTreeModule} from "@angular/material/tree";
import { AlertNewsComponent } from './admins/components/email/alert-news/alert-news.component';
import { PromotionalnewslettersComponent } from './admins/components/email/promotionalnewsletters/promotionalnewsletters.component';
import { PreviewAllComponent } from './pages/preview-all/preview-all.component';
import { UpdateAlertNewsLettersComponent } from './admins/components/email/dialog/update-alert-news-letters/update-alert-news-letters.component';
import { ManagePromotionalsComponent } from './admins/components/email/manage-promotionals/manage-promotionals.component';
import { AdminProfileComponent } from './admins/components/admin-profile/admin-profile.component';
import { CreateHotelsComponent } from './admins/components/hotels/create-hotels/create-hotels.component';
import { ManageHotelsComponent } from './admins/components/hotels/manage-hotels/manage-hotels.component';
import { CreateRoomComponent } from './admins/components/rooms/create-room/create-room.component';
import { ManageRoomComponent } from './admins/components/rooms/manage-room/manage-room.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { SingleDestinationComponent } from './pages/single-destination/single-destination.component';
import { AddDestinationsComponent } from './admins/components/destinations/add-destinations/add-destinations.component';
import { ManageDestinationsComponent } from './admins/components/destinations/manage-destinations/manage-destinations.component';
import { RelatedHotelsComponent } from './admins/components/destinations/related-hotels/related-hotels.component';
import { HotelsDisplayComponent } from './pages/hotels-display/hotels-display.component'

import { PaginatorModule } from 'primeng/paginator';
import { SingleHotelComponent } from './pages/single-hotel/single-hotel.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AddPackageComponent } from './admins/components/packages/add-package/add-package.component';
import { ManagePackagesComponent } from './admins/components/packages/manage-packages/manage-packages.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { SingularPackageComponent } from './pages/singular-package/singular-package.component';
import { RelatedPackagesComponent } from './components/related-packages/related-packages.component';
import { EditHotelsComponent } from './admins/components/hotels/edit-hotels/edit-hotels.component';
import { RequestquoteComponent } from './components/requestquote/requestquote.component';
import { enquiry } from './redux/reducers/quote.reducer';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ManageadminsComponent } from './admins/components/manageadmins/manageadmins.component';
import {BadgeModule} from "@coreui/angular";
import { ContactComponent } from './pages/contact/contact.component'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { CreateBlogsComponent } from './admins/components/blogs/create-blogs/create-blogs.component';
import { ManageBlogsComponent } from './admins/components/blogs/manage-blogs/manage-blogs.component';
import { AddBlogCategoryComponent } from './admins/components/blogs/add-blog-category/add-blog-category.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { SingularBlogComponent } from './pages/singular-blog/singular-blog.component';
import { RelatedBlogsComponent } from './components/related-blogs/related-blogs.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TeamComponent } from './components/team/team.component';
import { OnboardComponent } from './pages/onboard/onboard.component';
import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';
const reducers:ActionReducerMap<any> = {
  enquiry:enquiryReducer,
  bulks:bulkReducer,
  preview:previewReducer,
  enquiryRed:enquiry,
  statusAdmin:userStatusReducer
  }
  export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
      if (typeof window !== 'undefined') {
        return localStorageSync({ keys: ['enquiry','bulks',"statusAdmin","preview","enquiryRed"], rehydrate: true })(reducer)(state, action);
      }
      return reducer(state, action);
    };
  }
  
  
  const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
@NgModule({
  declarations: [AppComponent,HeaderComponent, HomeComponent, OverviewComponent, FrequentQuestComponent, FooterComponent, SafarisComponent, QuotationsComponent, AccomodationsComponent, HotelsComponent, PatnersComponent, EnquiriesComponent, EditEnquiryComponent, DeleteInquiryComponent, SignupComponent, SigninComponent, HeaderAddComponent, NotFoundComponent, VerifyEmailComponent, ResetPasswordComponent, RequestResetComponent, DashboardComponent, EmailsSendComponent, NewEmailComponent, BulkMailsComponent, NewBulkAddComponent, UpdateBulkComponent, DeleteBulkComponent, NewsLetterComponent, QueueComponent, ManageMailsComponent, ManageNewslettersComponent, PreviewComponent, AlertNewsComponent, PromotionalnewslettersComponent, PreviewAllComponent, UpdateAlertNewsLettersComponent, ManagePromotionalsComponent, AdminProfileComponent, CreateHotelsComponent, ManageHotelsComponent, CreateRoomComponent, ManageRoomComponent, DestinationsComponent, SingleDestinationComponent, AddDestinationsComponent, ManageDestinationsComponent, RelatedHotelsComponent, HotelsDisplayComponent, SingleHotelComponent, RoomsComponent, AddPackageComponent, ManagePackagesComponent, PackagesComponent, SingularPackageComponent, RelatedPackagesComponent, EditHotelsComponent, RequestquoteComponent, ManageadminsComponent, ContactComponent, EmptyDataComponent, CreateBlogsComponent, ManageBlogsComponent, AddBlogCategoryComponent, BlogsComponent, SingularBlogComponent, RelatedBlogsComponent, AboutUsComponent, TeamComponent, OnboardComponent, PreLoaderComponent ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    BrowserAnimationsModule,    
 MatChipsModule,
 MatAutocompleteModule,
 TabViewModule,
 PaginatorModule,
    EditorModule,
    HttpClientModule,
    MatSnackBarModule,
    MatBadgeModule,
    JoditAngularModule,
    MatIconModule,  
    CalendarModule,    
    ButtonModule,
    MdbCheckboxModule,
    MatSelectModule,
    TableModule,
    MatDatepickerModule,
    TagModule,
    MatTreeModule,
    MatTableModule,
    ConfirmPopupModule,
    MatCheckboxModule,
    MatDialogModule,
    FileUploadModule,
    MatListModule,
    DialogModule,
    GoogleMapsModule,
    AccordionModule,
    MatDividerModule,
    MatButtonModule,
    ImageModule,
    FormsModule,
    ScrollTopModule,
    ProgressSpinnerModule,
    ToastModule,
  SidebarModule,
 MatSidenavModule,   
 MatMenuModule,
 MatPaginatorModule,
 ClipboardModule,   
 GalleriaModule,
 DropdownModule,
 MatStepperModule,
 MatSlideToggleModule,
 StoreModule.forRoot(reducers,{metaReducers}) , 
ProgressBarModule,
MatTooltipModule,
 MatInputModule,
    RouterModule.forRoot([
      {
        component:AboutUsComponent,
        path:"about/us"
      }, 
      {
      component:OnboardComponent,
      path:"onboard/:paymentFor/:slug"
      },

    {
      component:HotelsDisplayComponent,
      path:"hotels"
     },
     {
      component:SingularBlogComponent,
      path:"blog/:blogSlug"
     },
     {
      component:SingleHotelComponent,
      path:"hotel/:hotelName/:hotelSlug"
    }, 
    {
    component:SingularPackageComponent,
    path:"safaris/:packageSlug"
    },
    {
      component:ContactComponent,
      path:"contact"
    },
    {
      path:"login",
      component:SigninComponent
      },
        
      {
        path:"register",
        component:SignupComponent
      },
      {
      component:VerifyEmailComponent,
      path:"verify/email/:token"
      },
      {
        component:SingleDestinationComponent,
        path:"destinations/:destinationTitle/:destinationsid"
      },  
      {
        component:PreviewAllComponent,
        path:"preview"
      },
      {
component:DashboardComponent,
path:"dashboard"
      },
      {
      component:DestinationsComponent,
      path:"destinations"
      },

      {
      component:ResetPasswordComponent,
      path:"reset/password/:token"
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
      path:"blogs",
      component:BlogsComponent
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
