declare var userAccessToken: String | null;

export const signIn = async (userId: Number, accessToken: String) => {
    setAccessToken(accessToken)
    document.cookie = `mhlm_userId=${userId};Path=/`
};

export const signOut = async () => {
    document.cookie = "mhlm_refreshToken=;Path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "mhlm_userId=;Path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setAccessToken(null)
}

export const setAccessToken = (accessToken: String | null) => {
    userAccessToken = accessToken;
}

export const getAccessToken = () => {
    return userAccessToken
}

export const isLoggedIn = () => {
    return !(userAccessToken == null)
}