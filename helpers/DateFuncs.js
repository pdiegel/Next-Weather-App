export function FindClosestData(dataPoints, timeProperty = "validTime") {
    if (!dataPoints) {
        // Simple error handling
        console.log("No data points provided!");
        return;
    }

    let closestData = dataPoints[0];
    const dateNow = new Date();

    for (let data of dataPoints) {
        const dataDate = new Date(data[timeProperty].split("/")[0]);
        const closestDataDate = new Date(closestData[timeProperty].split("/")[0]);
        if (Math.abs(dataDate - dateNow) < Math.abs(closestDataDate - dateNow)) {
            closestData = data;
        }
    }

    return closestData;
};

export function getFormattedDate(date) {
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day;
}
