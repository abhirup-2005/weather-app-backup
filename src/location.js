import { getCityName } from "./api.js";

export function getUserLocation() {

    return new Promise((resolve, reject) => {

        if (!navigator.geolocation) {
            reject("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                try {

                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    const city = await getCityName(lat, lon);

                    resolve(city);

                } catch (error) {
                    reject(error);
                }

            },

            (error) => {
                reject(error.message);
            }

        );

    });

}