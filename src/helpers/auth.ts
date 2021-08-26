declare var userAccessToken: String | null;

export const signIn = async (userId: Number, accessToken: string) => {
    await setAccessToken(accessToken)
};

export const signOut = async () => {
    document.cookie = "mhlm_refreshToken=;Path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setAccessToken(null)
}

export const setAccessToken = async (accessToken: string | null) => {
    if(accessToken == null){
        await localStorage.removeItem("mhlm_accessToken")
    }
    else {
        await localStorage.setItem('mhlm_accessToken', accessToken)
    }
    
}

export const getAccessToken = () => {
    const accessToken = localStorage.getItem('mhlm_accessToken')
    return accessToken ? accessToken : null
}

export const isLoggedIn = () => {
    return !(userAccessToken == null)
}