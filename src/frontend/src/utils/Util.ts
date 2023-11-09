
export const SERVER_URL = "http://localhost:8080/api/v1/";
export default class Util {
    parseJwt = (token: string): any => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    decodeToken = (token?: string | null): any | null => {
        const accessToken: string | null = localStorage.getItem("accessToken");
        if(accessToken == null) {
            return null;
        }

        if(!token) {
            token = localStorage.getItem("accessToken");
            if(!token) {
                return null;
            }
        }

        const decodedToken = this.parseJwt(token);
        if ((decodedToken.exp * 1000) < Date.now()) {
            // localStorage.removeItem("accessToken");
            console.log("Time: ", new Date(decodedToken.exp * 1000))
            return null;
        }
        return decodedToken;
    }

    formatDate = (date: string, delimiter: string = "-"): string => {
        const d = new Date(date);
        return ("0" + d.getDate()).slice(-2) + delimiter + ("0" + (d.getMonth() + 1)).slice(-2) + delimiter + d.getFullYear();
    }

}
