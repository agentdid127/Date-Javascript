const DateUtil = require("../DateUtil");

const UnixUtils = {
    UnixSupportedDate: {
        dateFromString: function(dateIn) {
            const UnixSupportedDate = require("./UnixSupportedDate")
            var date = dateIn.split(":");
            return new UnixSupportedDate(date[0], date[1], date[2], date[3], date[4], date[5], date[6])
        },
        fromDate: function(date) {
            return UnixUtils.UnixSupportedDate.dateFromString(date.toString());
        },

        toDate: function(date) {
            return DateUtil.CDate.dateFromString(date.toString());
        }
    },
    UnixTimestamp: {
        current: function() {
            const UnixTimestamp = require("./UnixTimestamp")
            const UnixFormat = require("./UnixFormat")
            var milli = Date.now();
            return new UnixTimestamp(milli, UnixFormat[1]);
        },
    
        fromDate: function(dateIn) {
            const DateUtil = require("../DateUtil")
            const UnixTimestamp = require("./UnixTimestamp")
            const UnixFormat = require("./UnixFormat")
            var date = dateIn
           //Get some useful information
            var yearTemp = date.getYear();
            if (yearTemp < 0) yearTemp++;
                var leapYearTemp = Math.floor(1970 / 4.0);
            var normalYearTemp = 1970 - leapYearTemp;
            var leapYears = Math.floor(yearTemp / 4.0);
            var normalYears = (yearTemp - leapYears);

            //Seconds through hours
            var secondN = date.getSecond()  * 1000;
            var minuteN = date.getMinute() * (1000 * 60);
            var hourN = date.getHour() * (1000 * 60 * 60);

            //Days
            var dayN = date.getDay();
            dayN--;
            if (DateUtil.CDate.isLeapYear(date.getYear())) dayN--;
            dayN *= (1000 * 60 * 60 * 24);

            //Months
            var monthN = 0;
            for (var i = 1; i < date.getMonth(); i++) monthN += DateUtil.CDate.getDaysInMonth(i, date.getYear());
            monthN *= (1000 * 60 * 60 * 24);

            //Years
            leapYears -= leapYearTemp;
            normalYears -= normalYearTemp;
            normalYears *= (1000 * 60 * 60 * 24) * 365;
            leapYears  = leapYears *  (1000 * 60 * 60 * 24) * 366;
            var yearN = leapYears + normalYears;
    
            return new UnixTimestamp(date.getMilli() + secondN + minuteN + hourN + dayN + monthN + yearN, UnixFormat[1]);
        },
    }
}

module.exports = UnixUtils;