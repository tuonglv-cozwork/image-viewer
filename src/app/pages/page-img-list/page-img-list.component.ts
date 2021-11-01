import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image-service/image.service';
import { USER_ID } from '../../constants/common-constant';
import { MatDialog } from '@angular/material/dialog';
import { DialogImageDetailComponent } from '../../widget/dialog-image-detail/dialog-image-detail.component';

@Component({
    selector: 'app-page-img-list',
    templateUrl: './page-img-list.component.html',
    styleUrls: ['./page-img-list.component.scss']
})
export class PageImgListComponent implements OnInit {
    public userId: string | null = "";
    public images: any = [];
    public currentPage: number = 0;
    public pageSize: number = 10;
    public isLoading: boolean = false;

    constructor(private imageService: ImageService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.userId = localStorage.getItem(USER_ID);
        this.findImage();
    }

    public findImage(isLoadMore?: boolean): void {
        this.currentPage++;
        if (!isLoadMore) {
            this.currentPage = 0;
        } else {
            this.isLoading = true;
        }
        this.imageService.findAllImageByUserId((this.userId === null) ? "" : this.userId, this.currentPage, this.pageSize).then((data) => {
            if (isLoadMore) {
                this.images = [...this.images, ...data.images];
            } else {
                this.images = data.images;
            }
            this.isLoading = false;
        })
    }

    public dateFormater(date: string | null): string {
        if (date) {
            let temp = new Date(date)
            return temp.toDateString();
        }
        return "";
    }

    public onImageDetail(data :string): void {
        this.dialog.open(DialogImageDetailComponent, {
            data: {
                imageSrc: data
            }
        })
    }
}
