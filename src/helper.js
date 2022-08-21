import raw from './partners.txt';

function degreesToRadians(degrees) {
    try {
        var pi = Math.PI;
        return degrees * (pi / 180);
    } catch (error) {
        console.error(error)
    }
}

export function calculateDistance(partnerLat, partnerLong) {
    try {
        const earthRadius = 6371;
        const sofiaLat = 42.6665921;
        const sofiaLong = 23.351723;

        const distance = earthRadius * Math.acos(Math.sin(degreesToRadians(sofiaLat)) * Math.sin(degreesToRadians(partnerLat))
            + Math.cos(degreesToRadians(sofiaLat)) * Math.cos(degreesToRadians(partnerLat))
            * Math.cos(degreesToRadians(sofiaLong - partnerLong)));

        return distance;
    } catch (error) {
        console.error(error);
    }
}

export async function fileReader() {
    try {
        const result = fetch(raw)
            .then(r => r.text())
            .then(text => {
                return text.split("\n");
            });
        return result;
    } catch (error) {
        console.error(error);
    }
}
