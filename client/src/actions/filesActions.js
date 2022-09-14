import fileService from '../services/FileService';
import storedFiles from '../store/filesStore.js';
import loadingStates from '../enums/LoadingStates.js';


export function fetchFiles() {
    const data = fileService.fetchImages();
    data.then(function(result) {
        storedFiles.setFiles(result.data);
    },
    function(res) {
        console.log("Can't fetch files from server", res?.data);
    })
}

export async function uploadFiles(event, setIsLoadingCallback) {
    setIsLoadingCallback(loadingStates.LOADING);

    const files = [...event.target.files];
    files.forEach((file, index, arr) => {
        const data = fileService.uploadFile(file);
        data.then(function(res) {
            console.log("Response in upload()");
            storedFiles.addFile(res.data);
        },
        function(res) {
            console.log("Can't upload file", res);
            console.log("Can't upload file", Object.keys(res));
        }).finally(() => {
            //all files are loaded
            console.log("Can't upload file", res?.data);
        }).finally(() => {
            if (index === arr.length-1) {
                console.log("In if false");
                setIsLoadingCallback(loadingStates.LOADED);
                // setTimeout(() => {setIsLoadingCallback(loadingStates.NORMAL);}, 3000);
            }
        })
    });
    // console.log("Set is loading false");
}

export async function deleteFile(id) {
    const response = await fileService.deleteFile(id);
    storedFiles.deleteFile(id);
    return response;
}

export async function updateFile(id, data) {
    const response = fileService.updateFile(id, data);
    response.then(function(result) {
        storedFiles.updateFile(id, result.data);
    },
    function(res) {
        console.log("Can't update file", res?.data);
    })
    return response;
}

