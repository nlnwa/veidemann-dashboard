import { MatDateFormats } from '@angular/material/core';

/**
 * Custom Date-Formats and Adapter (using https://github.com/iamkun/dayjs)
 */
export const MAT_DAYJS_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'l',
    timeInput: 'LT',
  },
  display: {
    dateInput: 'l',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
    timeInput: 'LT',
    timeOptionLabel: 'LT',
  },
};

