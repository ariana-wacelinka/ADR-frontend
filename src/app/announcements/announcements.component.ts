import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AnnouncementService } from '../../services/announcement/announcement.service';
import { NotificationService } from '../../services/notification/notification.service';
import { DrawerComponent } from '../drawer/drawer.component';
import { MatDivider } from '@angular/material/divider';
import { MatActionList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';

interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, DrawerComponent, RouterModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent {
  announcements: Announcement[] = [];

  constructor(private announcementService: AnnouncementService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.announcementService.getAnnouncements().subscribe({
      next: (announcements: Announcement[]) => {
        this.announcements = announcements.map((announcement: Announcement) => ({
          id: announcement.id,
          title: announcement.title,
          description: announcement.description,
          date: new Date(announcement.date).toLocaleDateString('es-AR')
        }));
      },
      error: (error) => {
        console.error('Error al cargar anuncios:', error);
        this.notificationService.showError('Error al cargar los anuncios');
      },
      complete: () => {
        console.log('Carga de anuncios completada');
      }
    });
  }

  deleteAnnouncement(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este anuncio?')) {
      this.announcementService.deleteAnnouncement(id).subscribe({
        next: () => {
          this.announcements = this.announcements.filter(
            (announcement: Announcement) => announcement.id !== id
          );
          this.notificationService.showSuccess('Anuncio eliminado correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar anuncio:', error);
          this.notificationService.showError('Error al eliminar el anuncio');
        }
      });
    }
  }

  updateAnnouncement(id: number) {
    this.router.navigate(['/announcements/edit', id]);
  }
}