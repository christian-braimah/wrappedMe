
async function fetchAccessToken() {
    const spotifyUrl = "https://accounts.spotify.com/api/token";
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

    const authOptions = {
        url: spotifyUrl,
        method: "POST",
        headers: {
            'Authorization': "Basic " + btoa(clientId + ":" + clientSecret),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: 'grant_type=client_credentials'
    }
    
  try{
    const response = await fetch (spotifyUrl, authOptions)

    const data = await response.json();
    const accessToken = data.access_token;
    return accessToken;
  }catch(error){
    console.log(error);
  }
}

export default fetchAccessToken;