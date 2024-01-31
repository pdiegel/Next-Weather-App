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

