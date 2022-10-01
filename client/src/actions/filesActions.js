import fileService from '../services/FileService';
import storedFiles from '../store/filesStore.js';
import errorsStore from '../store/errorsStore.js';
import {mainErrorHandler, switchError} from '../handlers/errorHandler.js'

import loadingStates from '../enums/LoadingStates.js';
import user from '../store/userStore.js';


export function fetchFiles() {
    console.log("filesActions::fetchFiles");
    const data = fileService.fetchImages();
    data.then(function(result) {
        console.log("filesActions::result: ", result.data);
        storedFiles.setFiles(result.data);
    },
    function(res) {
        console.log("Can't fetch files from server", res?.data);
    })
}

export async function uploadFiles(event, setIsLoadingCallback) {
    console.log("filesActions::uploadFile user: ", user);

    setIsLoadingCallback(loadingStates.LOADING);

    console.log("filesActions::uploadFile...");
    const files = [...event.target.files];
    files.forEach((file, index, arr) => {
        const data = fileService.uploadFile(file);
        data.then(function(res) {
            console.log("Response in upload()");

            storedFiles.addFile(res.data);
        },
        function(res) {
            console.log("filesActions:: Can't upload file", res);
            mainErrorHandler(res);
        }).finally(() => {
            //all files are loaded
            if (index === arr.length-1) {
                // console.log("filesActions::last file");
                setIsLoadingCallback(loadingStates.LOADED);
                switchError();
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

