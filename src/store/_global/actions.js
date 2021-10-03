import globalService from '@/services/global-service'

export const uploadUserImage = async (_, payload) => {
    try {
        const formData = new FormData();
        formData.append('pic', payload, payload.name)
        await globalService.uploadUserImage(formData);
    } catch (error) {
        console.log(error);
    }
}

export const uploadPetImage = async (_, payload) => {
    try {
        const formData = new FormData();
        formData.append('pic', payload, payload.name)
        await globalService.uploadPetImage(formData);
    } catch (error) {
        console.log(error);
    }
}