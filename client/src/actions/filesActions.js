import fileService from '../services/FileService';
import storedFiles from '../store/filesStore.js';
import errorsStore from '../store/errorsStore.js';
import {mainErrorHandler, noSpaceErrorHandler, switchError} from '../handlers/errorHandler.js'

import loadingStates from '../enums/LoadingStates.js';
import user from '../store/userStore.js';

export function fetchFiles() {
    const data = fileService.fetchImages();
    data.then(function(result) {
        storedFiles.setFiles(result.data);
    },
    function(res) {
        //console.log("Can't fetch files from server", res?.data);
    })
}

export async function uploadFiles(event, setIsLoadingCallback) {
    const files = [...event.target.files];
    const totalFilesSize = files.reduce((prev, curr, i) => {
        return prev + curr.size;
    }, 0);
    if (user.user.freeSpace < totalFilesSize) {
        return noSpaceErrorHandler();
    }

    setIsLoadingCallback(loadingStates.LOADING);
    files.forEach((file, index, arr) => {
        const data = fileService.uploadFile(file);
        data.then(function(res) {
            storedFiles.unshiftFile(res.data);
            user.reduceFreeSpace(file.size);
        },
        function(res) {
            mainErrorHandler(res);
        }).finally(() => {
            //all files are loaded
            if (index === arr.length-1) {
                setIsLoadingCallback(loadingStates.LOADED);
                switchError();
                // setTimeout(() => {setIsLoadingCallback(loadingStates.NORMAL);}, 3000);
            }
        })
    });
}

export async function deleteFile(id) {
    const response = await fileService.deleteFile(id);
    user.increaseFreeSpace(response?.data?.size);
    storedFiles.deleteFile(id);
    return response;
}

export async function updateFile(id, data) {
    const response = fileService.updateFile(id, data);
    response.then(function(result) {
        storedFiles.updateFile(id, result.data);
    },
    function(res) {
        //console.log("Can't update file", res?.data);
    })
    return response;
}
