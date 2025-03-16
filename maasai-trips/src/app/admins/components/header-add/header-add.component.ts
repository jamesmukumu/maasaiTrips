import { Component, Output, EventEmitter, Input, OnInit,inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import Cookies from 'js-cookie';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
interface MainCategory {
  Tree_Name: string;
  identifierName?: string;
  Tree_Children?: MainCategory[];
}

interface FlatNode {
  expandable: boolean;
  Tree_Name: string;
  identifierName?: string;
  level: number;
}

interface CurrentSelection {
  Name: string;
  hasNode: boolean;
  activeNode?: string;
}
@Component({
  selector: 'header-add',
  templateUrl: './header-add.component.html',
  styleUrl: './header-add.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderAddComponent {
  readonly snack = inject(MatSnackBar)
  @Output() choosenEmitter = new EventEmitter<CurrentSelection>();
  @Output() toogleNav = new EventEmitter<boolean>();
  @Input() showAdminControls = false;

  openSideDrawer = false;
  sideNavOpener = false;
  editAdminInfo = false;
  processing = false
  adminData: any;
  fullname = ''
  email = ''
  phoneNumber = ''
  home() {
    this.router.navigate(['/']);
  }
  hotels() {
    this.router.navigate(['/hotels']);
  }
  destinations(){
  this.router.navigate(["/destinations"])
  }
  safaris(){
  this.router.navigate(["/safaris"])
  }
 async popDialog(){
try{
  this.snack.open("Opening Editor...","Wait",{
  horizontalPosition:"center",
  verticalPosition:"bottom"
  })
this.processing = true
var {data}= await this.admin.fetchAdminsProfile()
this.editAdminInfo = true
this.fullname = data.userName
this.email = data.Email
this.phoneNumber = data.phoneNumber
}catch(err){
console.error(err)
}
 

}
  logoutUser() {
    Cookies.remove('grant_token');
    this.router.navigate(['/login']);
  }
  actualizeToggle() {
    this.toogleNav.emit(!this.sideNavOpener);
    this.sideNavOpener = !this.sideNavOpener;
  }

  mobileEmitter(name: string, nodeHas: boolean, activeNode?: string) {
    var chooser: CurrentSelection = {
      Name: name,
      hasNode: nodeHas,
      activeNode: activeNode,
    };
    this.choosenEmitter.emit(chooser);
    this.openSideDrawer = false;
  }
  signIn() {
    this.router.navigate(['/login']);
  }
  signUp() {
    this.router.navigate(['/register']);
  }

  opener() {
    this.openSideDrawer = true;
  }
  private _transformer = (node: MainCategory, level: number): FlatNode => {
    return {
      expandable: !!node.Tree_Children && node.Tree_Children.length > 0,
      Tree_Name: node.Tree_Name,
      identifierName: node.identifierName,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.Tree_Children
  );

  dataSource: any = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );


  dataSourceAccounts: any = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );
  dataSourceHotels: any = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );
  dataSourcePackages: any = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );
  dataSourceBlogs: any = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );
  dataSourceDestinations:any = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  )

  destinationsCategories: MainCategory[] = [
    {
      Tree_Name: 'Destinations',
      identifierName: 'Destinations',
      Tree_Children: [
        {
          Tree_Name: 'Add Destination',
          identifierName: 'Add Destination',
        },
        {
          Tree_Name: 'Manage My Destinations',
          identifierName: 'Manage My Destinations',
        }
      ],
    },
  ];
  accountsCategories: MainCategory[] = [
    {
      Tree_Name: 'Accounts',
      identifierName: 'accounts',
      Tree_Children: [
        {
          Tree_Name: 'View Profile',
          identifierName: 'View Profile',
        },
        {
          Tree_Name: 'Edit Profile',
          identifierName: 'Edit Profile',
        },
        {
          Tree_Name: 'Logout',
          identifierName: 'Logout',
        }
      ],
    },
  ];

  packagesCategories: MainCategory[] = [
    {
      Tree_Name: 'Packages',
      identifierName: 'Packages',
      Tree_Children: [
       
        {
          Tree_Name: 'Add New Package',
          identifierName: 'Add New Package',
        },
       
        {
          Tree_Name: 'Manage My Packages',
          identifierName: 'Manage My Packages',
        },
      ],
    },
  ];
  hotelCategories: MainCategory[] = [
    {
      Tree_Name: 'Hotels',
      identifierName: 'Mail',
      Tree_Children: [
        {
          Tree_Name: 'Add Hotel',
          identifierName: 'Add Hotel',
        },
        {
          Tree_Name: 'Add Rooms',
          identifierName: 'Add Rooms',
        },
        {
          Tree_Name: 'My Hotels',
          identifierName: 'My Hotels',
        },
        {
          Tree_Name: 'My Rooms',
          identifierName: 'MyRooms',
        },
      ],
    },
  ];
  categories: MainCategory[] = [
    {
      Tree_Name: 'Emails',
      identifierName: 'Mail',
      Tree_Children: [
        {
          Tree_Name: 'Create Email',
          identifierName: 'Create Email',
        },
        {
          Tree_Name: 'Send Email',
          identifierName: 'Send Email',
        },
        {
          Tree_Name: 'Send Bulk',
          identifierName: 'Send Bulk',
        },
        {
          Tree_Name: 'Create Newsletter',
          identifierName: 'Create Newsletter',
        },
        {
          Tree_Name: 'Show queue',
          identifierName: 'Show Queue',
        },
        {
          Tree_Name: 'Manage Mails',
          identifierName: 'Manage Mails',
        },
        {
          Tree_Name: 'Manage newsletters',
          identifierName: 'Manage newsletters',
        },
        {
          Tree_Name: 'Manage Promotional newsletters',
          identifierName: 'Manage Promotional newsletters',
        },
      ],
    },
  ];
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private admin: AdminService
  ) {
    this.dataSource.data = this.categories;
    this.dataSourceHotels.data = this.hotelCategories;
    this.dataSourcePackages.data = this.packagesCategories;
    this.dataSourceAccounts.data = this.accountsCategories
    this.dataSourceDestinations.data = this.destinationsCategories
  }
  hasChild = (_: number, node: FlatNode) => node.expandable;

  
}
