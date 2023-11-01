export default class Util {
    parseJwt = (token: string): any => {
        const baseUrl = token.split('.')[1]
        const base64 = baseUrl.replace(/-/g, '+').replace(/-/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16).slice(-2));
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    decodeToken = (token?: string | null): any | null => {
        const accessToken: string | null = localStorage.getItem("accessToken");
        if(accessToken == null) {
            return null;
        }

        if(!token) {
            token = localStorage.getItem("access_token");
            if(!token) {
                return null;
            }
        }

        const decodedToken = this.parseJwt(token);
        if ((decodedToken.exp * 1000) < Date.now()) {
            localStorage.removeItem("access_token");
            return null;
        }
        return decodedToken;
    }

}
