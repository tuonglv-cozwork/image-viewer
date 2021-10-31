import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image-service/image.service';

@Component({
    selector: 'app-page-img-list',
    templateUrl: './page-img-list.component.html',
    styleUrls: ['./page-img-list.component.scss']
})
export class PageImgListComponent implements OnInit {
    public imageSrc: string = "http://192.168.1.31:8080/image/image-name/thanh-2021-10-29-01-09-05.852.jpg";
    public description: string = "This is description";
    public date: string = new Date().toDateString();

    constructor(private imageService: ImageService) { }

    ngOnInit(): void {
    }

    public findImage(): void {
        // this.imageService.findAllImageByUserId()
    }

}
