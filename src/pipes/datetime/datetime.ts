import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the DatetimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'datetime',
})
export class DatetimePipe implements PipeTransform {
  constructor(private translate: TranslateService) {
  }
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    let monthNames = [
      { th: "มกราคม", en: "January" },
      { th: "กุมภาพันธ์", en: "February" },
      { th: "มีนาคม", en: "March" },
      { th: "เมษายน", en: "April" },
      { th: "พฤษภาคม", en: "May" },
      { th: "มิถุนายน", en: "June" },
      { th: "กรกฎาคม", en: "July" },
      { th: "สิงหาคม", en: "August" },
      { th: "กันยายน", en: "September" },
      { th: "ตุลาคม", en: "October" },
      { th: "พฤศจิกายน", en: "November" },
      { th: "ธันวาคม", en: "December" }
    ];
    let langguage = this.translate.currentLang;
    let date = new Date(value);
    let resultDateDay = date.getDate().toString();
    let resultM = langguage.toString() === 'th' ? monthNames[date.getMonth()].th : monthNames[date.getMonth()].en;
    let resultY = langguage.toString() === 'th' ? (date.getFullYear() + 543).toString() : date.getFullYear().toString();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let resultDate = resultDateDay + ' ' + resultM + ' ' + resultY + ' ' + hours + ':' + minutes;
    return resultDate;
  }
}
