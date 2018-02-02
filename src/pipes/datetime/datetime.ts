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
      { thai: "มกราคม", eng: "January" },
      { thai: "กุมภาพันธ์", eng: "February" },
      { thai: "มีนาคม", eng: "March" },
      { thai: "เมษายน", eng: "April" },
      { thai: "พฤษภาคม", eng: "May" },
      { thai: "มิถุนายน", eng: "June" },
      { thai: "กรกฎาคม", eng: "July" },
      { thai: "สิงหาคม", eng: "August" },
      { thai: "กันยายน", eng: "September" },
      { thai: "ตุลาคม", eng: "October" },
      { thai: "พฤศจิกายน", eng: "November" },
      { thai: "ธันวาคม", eng: "December" }
    ];
    let langguage = this.translate.currentLang;
    let date = new Date(value);
    let resultDateDay = date.getDate().toString();
    let mth = monthNames[date.getMonth()] && monthNames[date.getMonth()].thai ? monthNames[date.getMonth()].thai : '';
    let men = monthNames[date.getMonth()] && monthNames[date.getMonth()].eng ? monthNames[date.getMonth()].eng : '';
    let resultM = langguage.toString() === 'th' ? mth : men;
    let resultY = langguage.toString() === 'th' ? (date.getFullYear() + 543).toString() : date.getFullYear().toString();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let resultDate = resultDateDay + ' ' + resultM + ' ' + resultY + ' ' + hours + ':' + minutes;
    return resultDate;
  }
}
