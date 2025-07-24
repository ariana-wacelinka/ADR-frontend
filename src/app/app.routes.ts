import { Routes } from '@angular/router';
import { AnnouncementCreationComponent } from './announcenmentCreation/announcementCreation.component';
import { AnnouncementsComponent } from './announcements/announcements.component';

export const routes: Routes = [
    { path: 'home', component: AnnouncementsComponent },
    { path: '', redirectTo: '/announcements', pathMatch: 'full' },
    { path: 'announcements', component: AnnouncementsComponent },
    { path: 'announcements/new', component: AnnouncementCreationComponent },
    { path: 'announcements/edit/:id', component: AnnouncementCreationComponent },
    { path: 'create-announcement', component: AnnouncementCreationComponent },
    { path: 'update-announcement/:id', component: AnnouncementCreationComponent },
    { path: 'update-announcement/', redirectTo: '/announcements' },
];
