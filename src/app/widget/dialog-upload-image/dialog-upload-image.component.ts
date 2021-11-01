import { Component, OnInit } from '@angular/core';
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

    constructor(private imageService: ImageService) { }

    ngOnInit(): void {
    }

    public onFileSelected(event: any): void {
        this.formData = new FormData();
        this.formData.append("file", event.target.files);
        this.formData.append("description", this.description);
        if (this.formData) {
            this.isDisabled = true;
        } else {
            this.isDisabled = false;
        }
        this.imageName = event.target.files[0].name;
    }

    public onClickUpload(): void {
        if (this.formData && this.imageName.length > 0) {
            this.imageService.uploadImage(this.formData).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
}
