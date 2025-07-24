import { Component, Inject } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { DrawerListComponent } from "./drawer-list/drawer-list.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [ MatButtonModule, ToolbarComponent, MatSidenavModule, DrawerListComponent, MatIconModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  events: string[] = [];
  opened: boolean = true;
}
