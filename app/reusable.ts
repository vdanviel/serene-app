import env from "../env";
import { errorMesage } from "./alertMessages";

interface BaseUserData {
    user: {
        name: string;
        token: string;
        created_at: string;
        total_interactions: number;
        total_answers: number;
        chances_anxiety: number
    };
    interactions: Interaction[]
}

interface UserNotFound { 
    message: string;
    status: boolean;
}

export interface Interaction {
    id: number;
    created_at: string;
    diagnostic: string;
}

export type UserData = BaseUserData | UserNotFound | null;

export async function fetchAccount(token: string | null, offset: string = "0", len: string = "5"): Promise<UserData> {
    try {
        const response = await fetch(`${env.url_fetch}/user/info?token=${token}&offset=${offset}&limit=${len}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) throw new Error("Failed to fetch account");

        const data: UserData = await response.json();
        return data;

    } catch (error) {
        errorMesage(error, () => {});
        console.error(error);
        return null;
    }
}

export async function fetchDiags(token: string | null, offset: number = 0, len: number = 5): Promise<Interaction[]> {

    const response = await fetch(`${env.url_fetch}/user/diags?token=${token ?? ''}&offset=${offset}&limit=${len}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) throw new Error("Failed to fetch diagnostics");

    const data: Interaction[] = await response.json();

    return data;

}

