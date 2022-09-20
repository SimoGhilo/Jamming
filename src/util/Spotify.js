 
let accessToken;
 
 
const clientId = '8bd95acd81024f088ac637e7d47d8077';
const redirectUri = 'http://localhost:3000'
const Spotify = {



    search (term) {

        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
         {headers : {Authorization: `${accessToken}` }}).then(response =>{ response.json()}).then(jsonResponse =>
            {if(!jsonResponse.tracks) {
                return [];
            } 

            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artist,
                album: track.album.name,
                uri: track.uri
            }));
        
        })

    },

    savePlayList(name,trackUris) {
        if(!name || !trackUris.length) {
            return
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `${accessToken}`}
        let userId;
        return fetch('https://api.spotify.com/v1/me',{headers:headers}).then(response => 
        response.json()).then(responseJson => {
            userId = responseJson.id
            return fetch(`https://api.spotify.com/v1/me/v1/users/${userId}/playlists`,
            {
                headers:headers,
                method: 'POST',
                body: JSON.stringify({name:name})
            }).then(response =>{
                response.json()
            }).then(JSONResponse =>{
                const playlistId = JSONResponse.id;
                return fetch(`https://api.spotify.com/v1/me/v1/users/${userId}/playlists/${playlistId}/tracks`, {headers: headers,
                header: header,
                method : 'POST',
                body: JSON.stringify({uris:trackUris})
            })
            })

            
        })
    },





    getAccessToken () {

        if(accessToken) {
            return accessToken;
        } 
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

            if (accessTokenMatch && expiresInMatch) {

                accessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);
                window.setTimeout(() => accessToken = '', expiresIn*1000);
                window.history.pushState('Access Token',null,'/');
                return accessToken;
            } else {
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
                window.location = accessUrl;
            }
    }


}


export default Spotify 