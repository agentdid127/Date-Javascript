const DateUtil = {
    CDate: {
        dateFromString: function(dateIn) {
            const CDate = require("./CDate")
            var date = dateIn.split(":");
            return new CDate(date[0], date[1], date[2], date[3], date[4], date[5], date[6])
        },
        reformatDate: function(date) {
            const CDate = require("./CDate")
            var year = date.getYear(), month = date.getMonth(), day = date.getDay(), hour = date.getHour(), minute = date.getMinute(), second = date.getSecond(), milli = date.getMilli();
            var milli_correct = milli / 1000.0;
            milli = milli % 1000;
            second += Math.floor(milli_correct);

            var second_correct = second / 60.0;
            second = second % 60;
            minute += Math.floor(second_correct);

            var minute_correct = minute / 60.0;
            minute = minute % 60;
            hour += Math.floor(minute_correct);

            var hour_correct = hour / 24.0;
            hour = hour % 24;
            day += Math.floor(hour_correct);

            var tempM = month;
            var tempY = year % 4 + 1;

        while (day > DateUtil.CDate.getDaysInMonth(tempM, tempY)) {
            day -= DateUtil.CDate.getDaysInMonth(tempM, tempY);
            tempM++;
            month++;
            if (tempM > 12) {
                tempY++;
                tempM = 1;
            }
            if (tempY > 4) tempY = 1;
        }
        while (day <= 0) {
            day += DateUtil.CDate.getDaysInMonth(tempM, tempY);
            tempM--;
            month--;
            if (tempM < 1) {
                tempM = 12;
                tempY--;
            }
            if (tempY < 1) tempY = 4;
        }

        var month_correct = (month - 1) / 12.0;
        month = (month - 1) % 12 + 1;
        year += Math.floor(month_correct);

        if (date.year > 0 && year <= 0) year--;
        else if (date.year < 0 && year >= 0) year++;

        return new CDate(year, month, day, hour, minute, second, milli);
        },

        isLeapYear: function(year) {
            return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);    
        },
        
        getDaysInMonth: function(monthIn, year) {
            var month = (monthIn - 1) % 12 + 1
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
                return 31;
            else if (month == 2) {
                if (DateUtil.CDate.isLeapYear(year)) return 29;
                else return 28;
            }
            else if (month == 4 || month == 6 || month == 9 || month == 11)
                return 30;
        }
    }
}

module.exports = DateUtil