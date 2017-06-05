import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {OverviewLayout} from "../../model/layout/OverviewLayout";
import {Image} from "../../model/Image";

@Component({
  selector: 'event-overview',
  templateUrl: 'event-overview.component.html',
  styleUrls: ['event-overview.component.css']
})

export class EventOverviewComponent implements OnInit {
  @Input() overviewLayout: OverviewLayout;
  @Input() images: Image[];
  @Output() goToEventDetail: EventEmitter<boolean> = new EventEmitter();

  private selectedImages: Image[] = [];
  @Input() savedSelectedImages: Image[] = [];
  @Output() selectedImagesEmitter: EventEmitter<Image[]> = new EventEmitter();

  /**
   * Configuration of carousel
   * */
  private config: Object = {
    pagination: '.swiper-pagination',
    slidesPerView: 3,
    spaceBetween: 10,
    paginationType: 'fraction'
  };

  private selectedImagesConfig: Object = {
    pagination: '.swiper-pagination',
    slidesPerView: 4,
    spaceBetween: 5,
    paginationType: 'fraction'
  };

  constructor() {
  }

  ngOnInit(): void {
    if (this.savedSelectedImages != null) {
      this.selectedImages = this.savedSelectedImages;
      console.log(this.images);
    }
  }

  /**
   * Functions to customize the layout style.
   */

  setLogo(): any {
    if (this.overviewLayout != null && this.overviewLayout.logo != null) {
      switch (this.overviewLayout.logoPosition) {
        case 0:
          return {'justify-content': 'flex-start'};
        case 1:
          return {'justify-content': 'center'};
        case 2:
          return {'justify-content': 'flex-end'};
      }
    }
  }

  setImageContainerStyle(): any {
    if (this.overviewLayout != null && this.overviewLayout.imageContainer) {
      return {
        'background-color': this.overviewLayout.imageContainerColor,
        'border': this.overviewLayout.imageContainerBorderWidth + "px solid " + this.overviewLayout.imageContainerBorderColor
      }
    } else {
      return {
        'background': 'none',
        'border': 'none'
      }
    }
  }

  setImageStyle(): any {
    if (this.overviewLayout != null) {
      return {
        'border': this.overviewLayout.imageBorderWidth + 'px solid ' + this.overviewLayout.imageBorderColor
      }
    } else {
      return {'border': 'none'}
    }
  }

  setSelectionContainerStyle(): any {
    if (this.overviewLayout != null && this.overviewLayout.selectionContainer) {
      return {
        'background-color': this.overviewLayout.selectionContainerColor,
        'border': this.overviewLayout.selectionContainerBorderWidth + 'px solid ' + this.overviewLayout.selectionContainerBorderColor
      }
    } else {
      return {
        'background': 'none',
        'border': 'none'
      }
    }
  }

  setSelectButton(): any {
    if (this.overviewLayout != null && this.overviewLayout.selectBtnImage == null) {
      return {
        'background': this.overviewLayout.selectBtnColor,
        'border': this.overviewLayout.selectBtnBorderWidth + 'px solid ' + this.overviewLayout.selectBtnBorderColor,
        'color': this.overviewLayout.selectBtnBorderColor
      }
    } else {
      return {'background': 'none', 'border': 'none'}
    }
  }

  /**
   * Choose image.
   */
  selectImage(img: Image) {
    if (this.selectedImages.indexOf(img) > -1) {
      this.selectedImages = this.selectedImages.filter(x => x.imageNumber != img.imageNumber);
    } else {
      this.selectedImages.push(img);
    }
    console.log(this.selectedImages);
  }

  /**
   * Click the select button and go to event-detail.
   */
  clickSelectBtn() {
    this.selectedImagesEmitter.emit(this.selectedImages);
    this.goToEventDetail.emit(true);
  }
}
