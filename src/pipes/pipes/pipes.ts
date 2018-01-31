import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PipesPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pipes',
})
export class PipesPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Array<any>) {
    let resultText = '';
    if (value && value.length === 7) {
      resultText = 'ทุกวัน'
    } else if (value && value.length === 5) {
      let normalDays = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์'];
      let resultNormalDays = 0;
      for (let i = 0; i < value.length; i++) {
        if (normalDays.indexOf(value[i]) != -1) {
          resultNormalDays += 1;
        }
      }
      if (resultNormalDays === 5) {
        resultText = 'วันธรรมดา'
      } else {
        let lastValue = value.length - 1;
        value.forEach(function (v, i) {
          if (lastValue === i) {
            resultText += v
          } else {
            resultText += v + ', '
          }
        });
      }
    } else if (value && value.length === 2) {
      let weekEnds = ['เสาร์', 'อาทิตย์'];
      let resultWeekEnd = 0;
      for (let i = 0; i < value.length; i++) {
        if (weekEnds.indexOf(value[i]) != -1) {
          resultWeekEnd += 1;
        }
      }
      if (resultWeekEnd === 2) {
        resultText = 'สุดสัปดาห์'
      } else {
        let lastValue = value.length - 1;
        value.forEach(function (v, i) {
          if (lastValue === i) {
            resultText += v
          } else {
            resultText += v + ', '
          }
        });
      }
    } else {
      let lastValue = value.length - 1;
      value.forEach(function (v, i) {
        if (lastValue === i) {
          resultText += v
        } else {
          resultText += v + ', '
        }
      });
    }
    return resultText;
    // return value.toLowerCase();
  }
}
