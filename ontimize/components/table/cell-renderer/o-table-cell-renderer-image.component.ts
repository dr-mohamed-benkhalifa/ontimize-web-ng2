import { Component, OnInit, Inject, forwardRef } from '@angular/core';

import { ITableCellRenderer } from '../../../interfaces';
import { OTableColumnComponent } from '../o-table-column.component';
import { Util } from '../../../util/util';

export const DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_IMAGE = [

  // image-type [base64|url]: image type (extern url or base64). Default: no value.
  'imageType: image-type',

  // empty-image [string]: url of the image to be shown if the column has not any value. Default: no value.
  'emptyImage: empty-image',

  // avatar [no|yes]: view image as avatar (circle), only at presentation level. Default: no.
  'avatar'

];

@Component({
  selector: 'o-table-cell-renderer-image',
  template: '',
  inputs: [
    ...DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_IMAGE
  ]
})
export class OTableCellRendererImageComponent implements OnInit, ITableCellRenderer {

  public static DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_IMAGE = DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_IMAGE;

  protected imageType : string;
  protected avatar : any;
  protected emptyImage : string;

  constructor(@Inject(forwardRef(() => OTableColumnComponent)) tableColumn: OTableColumnComponent) {
    tableColumn.registerRenderer(this);
  }

  public ngOnInit() {
    this.avatar = Util.parseBoolean(this.avatar, false);
  }

  public init(parameters: any) {
    if (typeof(parameters) !== 'undefined') {
      if (typeof(parameters.imageType) !== 'undefined') {
        this.imageType = parameters.imageType;
      }
      if (typeof(parameters.avatar) !== 'undefined') {
        this.avatar = parameters.avatar;
      }
      if (typeof(parameters.emptyImage) !== 'undefined') {
        this.emptyImage = parameters.emptyImage;
      }
    }
  }

  public render(cellData: any, rowData: any): string {
    let template = '<div class="' + (this.avatar ? 'image-avatar' : 'image-plain') + '">';
    let imageSrc = '';
    switch (this.imageType) {
      case 'base64':
        imageSrc = cellData ? ('data:image/*;base64,' + ((typeof(cellData.bytes) !== 'undefined') ? cellData.bytes : cellData)) : this.emptyImage;
        break;
      case 'url':
        imageSrc = cellData ? cellData : this.emptyImage;
        break;
      default:
        imageSrc = this.emptyImage;
        break;
    }
    if (typeof(imageSrc) !== 'undefined') {
      template += '<img src="' + imageSrc + '" />';
    }
    template += '</div>';
    return template;
  }

  public handleCreatedCell(cellElement: any, rowData: any) {
    // nothing to do here
  }

}
