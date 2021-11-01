import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageService } from '../../services/image-service/image.service';

@Component({
    selector: 'dialog-upload-image',
    templateUrl: './dialog-upload-image.component.html',
    styleUrls: ['./dialog-upload-image.component.scss']
})
export class DialogUploadImageComponent implements OnInit {
    public formData: FormData | undefined;
    public isDisabled: boolean = true;
    public description: string = "";
    public imageName: string = "";
    public file: any;

    constructor(private imageService: ImageService, public dialogRef: MatDialogRef<DialogUploadImageComponent>) { }

    ngOnInit(): void {
    }

    public onFileSelected(event: any): void {
        this.file = event.target.files[0];
        this.imageName = this.file.name;
    }

    public onClickUpload(): void {
        this.formData = new FormData();
        this.formData.append("file", this.file);
        this.formData.append("description", this.description);
        if (this.formData) {
            this.isDisabled = true;
        } else {
            this.isDisabled = false;
        }
        if (this.formData && this.imageName.length > 0) {
            this.imageService.uploadImage(this.formData).then((data) => {
                this.dialogRef.close();
            }).catch((err) => {
                console.log(err);
            })
        }
    }
}
