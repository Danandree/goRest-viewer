import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationDialogComponent } from '../../components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { User } from '../../interfaces/go-rest-apidata-structure';

describe('DeleteConfirmationDialogComponent', () => {
  let component: DeleteConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteConfirmationDialogComponent],
      providers: [{provide: MAT_DIALOG_DATA, useValue: {user: new User()}}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
