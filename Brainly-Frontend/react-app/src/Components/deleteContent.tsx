import axios from "axios";
//import { BACKEND_URL } from "../config";


export async function deleteContent(id: string) {
try {
    const response = await axios.delete(`http://localhost:5000/api/v1/deletecontent`, {
        data: { contentId: id },
    });
    return response.data;
} catch (error) {
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to delete content');
    }
    throw new Error('An unexpected error occurred');
}
}