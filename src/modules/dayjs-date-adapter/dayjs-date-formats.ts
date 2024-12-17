import { MatDateFormats } from '@angular/material/core';

/**
 * Custom Date-Formats and Adapter (using https://github.com/iamkun/dayjs)
 */
export const MAT_DAYJS_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: [
            'M/D/YY',
            'MM/DD/YY',
            'MM/DD/YYYY',
            'YYYY/MM/DD',
            'YYYY-MM-DD',
            'MM-DD-YYYY',
            'M-D-YY',
            'MM-DD-YY'
        ]
    },
    display: {
        dateInput: 'MM/DD/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};
