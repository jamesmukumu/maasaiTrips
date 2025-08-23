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
  comprehensiveItinerary: any;
  packageData: any;
  packageSlug = '';
  relatedPackage: any;
  imagesPackage: any;
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
    return JSON.parse(packageImages).slice(0, 4);
  }

  onboard() {
    this.route.navigate([`/onboard/packages/${this.packageSlug}`], {
      queryParams: {
        "onboard": this.packageData['id']
      }
    });
  }

  /**
   * Distribute images evenly across itinerary days
   */
  distributeImages(images: string[], itinerary: any[]): string[][] {
    const totalImages = images.length;
    const totalDays = itinerary.length;
    const baseCount = Math.floor(totalImages / totalDays);
    let remainder = totalImages % totalDays;

    const chunks: string[][] = [];
    let start = 0;

    for (let i = 0; i < totalDays; i++) {
      let extra = remainder > 0 ? 1 : 0; // spread leftover images one by one
      let count = baseCount + extra;
      remainder = Math.max(0, remainder - 1);

      let end = start + count;
      chunks.push(images.slice(start, end));
      start = end;
    }

    return chunks;
  }

  async fetchPackage() {
    try {
      this.fetching = true;
      const { data, relatedPackages } = await this.packages.fetchSingularPackages(this.packageSlug);
      this.packageData = data;
      this.comprehensiveItinerary = data.packageAbout;
      this.imagesPackage = JSON.parse(data.packageImages);
      this.relatedPackage = relatedPackages;

      // distribute images evenly across itinerary
      const distributed = this.distributeImages(this.imagesPackage, this.comprehensiveItinerary);
      this.comprehensiveItinerary = this.comprehensiveItinerary.map((day: any, i: number) => {
        return {
          ...day,
          images: distributed[i] || []
        };
      });

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
    const items: GalleryItem[] = images.map((img: any) => new ImageItem({ src: img, thumb: img }));
    this.gallery.ref(this.galleryId).load(items);
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.packageSlug = params.get("packageSlug") ?? "";
      this.fetchPackage();
    });
  }
@ViewChild("contactRef", { read: ElementRef }) contactRef!: ElementRef;


contact_handler(event:any){
this.contactRef.nativeElement.scrollIntoView({
  behavior:"smooth",
  block:"start"
  })
}
  priceFormatter(charge: any) {
    return charge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
