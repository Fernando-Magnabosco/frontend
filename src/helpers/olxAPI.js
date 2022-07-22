import Cookies from "js-cookie";
import qs from "qs";
import { doLogout } from "./authHandler";
// const BASEAPI = "http://192.168.129.122:5000";
const BASEAPI = "http://localhost:5001";

const apiFetchFile = async (endpoint, body) => {
    if (!body.token) {
        const token = Cookies.get("token");
        if (token) body.append("token", token);
    }

    const response = await fetch(
        BASEAPI + endpoint,

        {
            method: "POST",
            body,
        }
    );

    const json = await response.json();

    if (json.notallowed) {
        doLogout();
        window.location.href = "/signin";
        return;
    }

    return json;
};

const apiFetchPost = async (endpoint, body) => {
    if (!body.token) {
        const token = Cookies.get("token");
        if (token) body.token = token;
    }

    const response = await fetch(
        BASEAPI + endpoint,

        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },

            body: JSON.stringify(body),
        }
    );
    const json = await response.json();

    if (json.notallowed) {
        doLogout();
        window.location.href = "/signin";
        return;
    }

    return json;
};

const apiFetchPut = async (endpoint, body) => {
    if (!body.token) {
        const token = Cookies.get("token");
        if (token) body.token = token;
    }

    const response = await fetch(
        BASEAPI + endpoint,

        {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },

            body: JSON.stringify(body),
        }
    );

    const json = await response.json();

    if (json.notallowed) {
        doLogout();
        window.location.href = "/signin";
        return;
    }

    return json;
};

const apiFetchGet = async (endpoint, body = []) => {
    if (!body.token) {
        const token = Cookies.get("token");
        if (token) body.token = token;
    }

    const response = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);

    const json = await response.json();

    if (json.notallowed) {
        window.location.href = "/signin";
        return;
    }

    return json;
};

const olxAPI = {
    login: async (email, password) => {
        const json = await apiFetchPost("/user/signin", { email, password });

        return json;
    },

    getStates: async () => {
        const json = await apiFetchGet("/states");
        return json.states;
    },

    signUp: async (name, stateLoc, email, password) => {
        const json = await apiFetchPost("/user/signup", {
            name,
            state: stateLoc,
            email,
            password,
        });

        return json;
    },

    getCategories: async () => {
        const json = await apiFetchGet("/categories");
        json.categories.map((category) => {
            category.img = BASEAPI + category.img.substring(21);
        });
        return json.categories;
    },

    getAds: async (options) => {
        const json = await apiFetchGet("/ad/list", options);
        json.ads.map((ad) => {
            ad.image = BASEAPI + ad.image.substring(21);
        });
        return json;
    },

    getAd: async (id, other = false) => {
        const json = await apiFetchGet("/ad/item", { id, other });

        if (json.error) return json;

        for (let i = 0; i < json.images.length; i++) {
            json.images[i] = BASEAPI + json.images[i].substring(21);
        }

        json.others.map((ad) => {
            ad.image = BASEAPI + ad.image.substring(21);
        });

        return json;
    },

    newAd: async (fData) => {
        const json = await apiFetchFile("/ad/add", fData);
        return json;
    },

    getUserInfo: async () => {
        const json = await apiFetchGet("/user/me");
        return json;
    },

    getApi: () => {
        return BASEAPI;
    },

    updateUser: async (body) => {
        const json = await apiFetchPut("/user/me", body);
        return json;
    },

    updateAd: async (body, id) => {
        const json = await apiFetchFile("/ad/" + id, body);
        return json;
    },
};

export default () => olxAPI;
