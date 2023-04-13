import axios from "axios";

class GeoLocationServices {

    getAllLocations() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/geoLocations/`);
    }

    postLocationClicks(locClicks) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/geoLocations/clicks`, locClicks);
        // console.log(locClicks);
    }
}

export default new GeoLocationServices;