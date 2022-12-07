const CDate = require("../CDate");
const UnixFormat = require("./UnixFormat");
const UnixTimestamp = require("./UnixTimestamp")
const UnixUtils = require("./UnixUtils")

class UnixSupportedDate extends CDate {
    
    constructor(year = 1970, month = 1, day = 1, hour = 0, minute = 0, second = 0, milli = 0) {
        super(year, month, day, hour, minute, second, milli)
    }

    getUnixSeconds() {
        return new UnixTimestamp(this.getUnixMilli().getData()/1000, UnixFormat[0]);
    }

    getUnixMilli() {
        return UnixUtils.UnixTimestamp.fromDate(this);
    }

    toString() {
        return super.toString()
    }
}

module.exports = UnixSupportedDate;