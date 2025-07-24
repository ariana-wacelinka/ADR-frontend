import { Component } from '@angular/core';
import { AnnouncementService } from '../../services/announcement/announcement.service';
import { NotificationService } from '../../services/notification/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../index';
import { DrawerComponent } from "../drawer/drawer.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

interface Announcement {
  id?: number;
  title: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-announcement-form',
  standalone: true,
  imports: [
    MatMenuModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressBarModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    DrawerComponent
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './announcementCreation.component.html',
  styleUrls: ['./announcementCreation.component.scss'],
})
export class AnnouncementCreationComponent {
  readonly date = new FormControl(new Date());
  readonly serializedDate = new FormControl(new Date().toLocaleDateString('es-AR'));
  form: FormGroup;
  announcements: Announcement[] = [];
  isEditMode = false;
  announcementId: number = 0;
  encontrado = true;

  constructor(
    private announcementService: AnnouncementService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: this.date
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.announcementId = parseInt(idParam, 10);
      this.loadAnnouncementForEdit();
    }
  }

  loadAnnouncementForEdit() {
    this.announcementService.getAnnouncements().subscribe({
      next: (announcements) => {
        const announcementToUpdate = announcements.find((announcement) => announcement.id === this.announcementId);
        if (announcementToUpdate) {
          this.encontrado = true;
          this.form.patchValue({
            title: announcementToUpdate.title,
            description: announcementToUpdate.description,
            date: new Date(announcementToUpdate.date)
          });
        } else {
          this.encontrado = false;
          console.error('No se ha encontrado el anuncio a modificar');
        }
      },
      error: (error) => {
        console.error('Error al obtener anuncios:', error);
        this.encontrado = false;
      }
    });
  }

  createAnnouncement() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const announcement: Omit<Announcement, 'id'> = {
        title: formValue.title,
        description: formValue.description,
        date: formValue.date instanceof Date ?
          formValue.date.toISOString() :
          new Date(formValue.date).toISOString()
      };

      console.log('Datos enviados:', announcement);

      this.announcementService.createAnnouncement(announcement).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.form.reset();
          this.date.setValue(new Date());
          this.notificationService.showSuccess('Anuncio creado correctamente');
          this.router.navigate(['/announcements']);
        },
        error: (error) => {
          console.error('Error al crear anuncio:', error);
          this.notificationService.showError('Error al crear el anuncio');
        }
      });
    } else {
      console.error('Formulario inválido');
      this.notificationService.showWarning('Por favor, complete todos los campos requeridos');
    }
  }

  updateAnnouncement() {
    if (this.form.valid && this.announcementId) {
      const announcement = {
        ...this.form.value,
        id: this.announcementId,
        date: this.form.value.date instanceof Date ?
          this.form.value.date.toISOString() :
          new Date(this.form.value.date).toISOString()
      };

      this.announcementService.updateAnnouncement(announcement).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Anuncio modificado correctamente');
          this.router.navigate(['/announcements']);
        },
        error: (error) => {
          console.error('Error al modificar anuncio:', error);
          this.notificationService.showError('Error al modificar el anuncio');
        }
      });
    } else {
      console.error('Formulario inválido');
      this.notificationService.showWarning('Por favor, complete todos los campos requeridos');
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateAnnouncement();
    } else {
      this.createAnnouncement();
    }
  }

  volver() {
    this.router.navigate(['/announcements']);
  }
}