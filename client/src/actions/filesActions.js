import fileService from '../services/FileService';
import storedFiles from '../store/filesStore.js';


export function fetchFiles() {
    const data = fileService.fetchImages();
    data.then(function(result) {
        storedFiles.setFiles(result.data);
    },
    function(res) {
        console.log("Can't fetch files from server", res?.data);
    })
}

export function uploadFiles(event) {
    const files = [...event.target.files];
    files.forEach(file => {
        const data = fileService.uploadFile(file);
        data.then(function(res) {
            storedFiles.addFile(res.data);
        },
        function(res) {
            console.log("Can't upload file", res?.data);
        })
    });
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

