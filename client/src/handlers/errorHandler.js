import errorsStore from '../store/errorsStore.js';

export function mainErrorHandler(resp) {
    if (!resp) noSpaceErrorHandler();
    if (resp.response.data?.info?.FileExistError) {
        fileExistErrorHandler(resp);
    } else {
        generalErrorHandler(resp);
    }
}

export function noSpaceErrorHandler() {
    const message = "Не достатньо місця у сховищі. Файли не можуть бути завантажені.";
    errorsStore.setGeneralMessage(message);
    errorsStore.setErrorExist(true);
}

function fileExistErrorHandler(resp) {
    if (errorsStore.isFileExistErrorEmpty()) {
        const message = "Не вдалось завантажити наступні зображення. \
        Зображення з такими назвами уже існують:";
        errorsStore.setFileExistMessage(message);
    }
    const fileName = resp.response.data?.info?.fileName;
    errorsStore.addFileExistItem(fileName);
}

function generalErrorHandler(resp) {
    if (errorsStore.isGeneralErrorEmpty()) {
        const message = "Виникли деякі технічні неполадки. Частина файлів не була завантажена";
        errorsStore.setGeneralMessage(message);
    }
    errorsStore.setErrorExist(true);
}
export function switchError() {
    //wait while all files with equal names catched
    if (!errorsStore.isFileExistErrorEmpty()) {
        errorsStore.setErrorExist(true);
    }
}


