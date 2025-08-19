import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackagesService } from '../../services/packages.service';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'singular-package',
  templateUrl: './singular-package.component.html',
  styleUrls: ['./singular-package.component.css']
})
export class SingularPackageComponent implements OnInit {
  @ViewChild("specialNotes") specialNotesRef!: ElementRef;
  @ViewChild("inclusions") inclusionsRef!: ElementRef;
  @ViewChild("exclusions") exclusionsRef!: ElementRef;
  @ViewChild("itinerary") itineraryRef!: ElementRef;
  @ViewChild("overView") overViewRef!: ElementRef;

  fetching = false;
  packageData: any;
  packageSlug = '';
  relatedPackage: any;
  galleryId = 'packageGallery';

  constructor(
    private route: Router,
    private titlePage: Title,
    private router: ActivatedRoute,
    private sanitizor: DomSanitizer,
    private packages: PackagesService,
    private gallery: Gallery,
    private lightbox: Lightbox
  ) {}

  goOverview() {
    this.overViewRef.nativeElement.scrollIntoView({ behavior: "smooth", block: 'start' });
  }

  goExclusions() {
    this.exclusionsRef.nativeElement.scrollIntoView({ behavior: "smooth", block: 'start' });
  }

  goInclusions() {
    this.inclusionsRef.nativeElement.scrollIntoView({ behavior: "smooth", block: 'start' });
  }

  goItinerary() {
    this.itineraryRef.nativeElement.scrollIntoView({ behavior: "smooth", block: 'start' });
  }

  goSpecial() {
    this.specialNotesRef.nativeElement.scrollIntoView({ behavior: "smooth", block: 'start' });
  }

  sanitize(data: SafeHtml | any) {
    return this.sanitizor.bypassSecurityTrustHtml(data);
  }

  formatInclusives(incl: any) {
    return JSON.parse(incl);
  }

  formatExclusives(excl: any) {
    return JSON.parse(excl);
  }

  formatPackageImages(packageImages: any) {
    return JSON.parse(packageImages).slice(0,4);
  }

  onboard() {
    this.route.navigate([`/onboard/packages/${this.packageSlug}`], {
      queryParams: {
        "onboard": this.packageData['id']
      }
    });
  }

  async fetchPackage() {
    try {
      this.fetching = true;
      const { data, relatedPackages } = await this.packages.fetchSingularPackages(this.packageSlug);
      this.packageData = data;
      this.relatedPackage = relatedPackages;
      this.fetching = false;

      this.loadGalleryImages();
      this.titlePage.setTitle(`${this.packageData.packageTitle} | Maasai Mara Trips`);
    } catch (err) {
      console.error(err);
      this.fetching = false;
    }
  }

  loadGalleryImages() {
    const images = this.formatPackageImages(this.packageData.packageImages) || [];
    const items: GalleryItem[] = images.map((img:any) => new ImageItem({ src: img, thumb: img }));
    this.gallery.ref(this.galleryId).load(items);
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.packageSlug = params.get("packageSlug") ?? "";
      this.fetchPackage();
    });
  }

  priceFormatter(charge:any){
    return charge.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
  }
}
