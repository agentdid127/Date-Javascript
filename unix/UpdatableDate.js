const UnixTimestamp = require("./UnixTimestamp");
const UnixUtils = require("./UnixUtils");

class UpdatableDate {
    constructor(date) {
        this.createDate = UnixUtils.UnixTimestamp.current().toDate();
        this.date = date;
    }

    getDate() {
        const diff = UnixUtils.UnixTimestamp.current().toDate().diff(this.createDate);
        return this.date.formattedSum(diff);
    }
}

module.exports = UpdatableDate;