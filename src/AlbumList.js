class GalleryApi {
    static ALBUM_LINKS_API_URL = "https://jsonplaceholder.typicode.com/albums";
    static FOTOS_API_URL = "https://jsonplaceholder.typicode.com/photos?albumId=";

    static getList() {
        return fetch(GalleryApi.ALBUM_LINKS_API_URL).then((response) => {
            if (response.ok) {
                return response.json();
            }

            throw new Error("Can not get list of album links!");
        });
    }

    static getPhotos(albumId) {
        return fetch(GalleryApi.FOTOS_API_URL + albumId).then((response) => {
            if (response.ok) {
                return response.json();
            }

            throw new Error("Can not get album photos!");
        });
    }
}