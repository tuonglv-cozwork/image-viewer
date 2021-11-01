import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'widget-image-card',
    templateUrl: './widget-image-card.component.html',
    styleUrls: ['./widget-image-card.component.scss']
})
export class WidgetImageCardComponent implements OnInit {

    @Input()
    public imageSrc: string | undefined;

    @Input()
    public description: string = "no description";

    @Input()
    public date: string = "no date";

    constructor() { }

    public ngOnInit(): void {
    }
}
