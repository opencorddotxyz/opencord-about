export const developmentUrl = "https://api-dev.opencord.so"
export const ProductionUrl = "https://api.opencord.xyz"

export const getWebsiteHost = (env:string)=> {
    if(env === 'production') {
        return 'https://www.opencord.xyz'
    }

    return 'https://dev.opencord.so'
}