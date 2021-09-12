import globalService from '@/services/global-service'

export const uploadImage = async (_, payload) => {
    try {
        const formData = new FormData();
        formData.append('pic', payload, payload.name)
        await globalService.uploadImage(formData);
    } catch (error) {
        console.log(error);
    }
}