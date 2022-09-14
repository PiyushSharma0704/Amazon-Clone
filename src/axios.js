import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:5001/amz-clone-7a20a/us-central1/api' //THE API (CLOUD FUNCTION) URL
});

export default instance;

//