/*

    aqui estamos criando o type do contexto que vem de app/(tabs)/user.tsx em UserData.
    também estamos dizendo que ele pode ser null caso o usuário não esteja autenticado..

*/

import { createContext, useContext } from "react";

import { UserData } from "./reusable";

export const AuthContext = createContext<UserData | null | undefined | void>(null);//cria o contexto com null, pq de maneira estatica de começo ele realemte é null

//caso por algum motivo user ser undefined.. (casos de esquecimento, esse erro vai lembrar) - evita o uso de de "?" (ponto de interogação) quando estiver usando o context ("user?.atr")
export function useUserContext() {

    const user = useContext(AuthContext);

    if (user === undefined || user === null || 'status' in user) {//se tem o atr 'status' é pq a api deu alguma mensgem de erro ao encontrar o ususário, ent erro, pois o usuário n esta com o dados dele.

        throw new Error("useUserContext must be used with a AuthContext");

    }

    return user;
}