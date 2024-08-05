import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { UserData } from './reusable'; // Importa o tipo UserData
import { fetchAccount } from './reusable'; // Função para buscar dados da conta
import env from '../env'; // Importa variáveis de ambiente
import { useColorScheme } from '@/components/useColorScheme';
import Colors from "@/constants/Colors";


// Define o tipo de valor do contexto
type AuthContextType = UserData | null | undefined;

// Cria o contexto com um valor padrão de null
export const AuthContext = createContext<AuthContextType>(null);

// Hook personalizado para acessar o AuthContext
export function useUserContext() {
    // Obtém o valor atual do contexto
    const user = useContext(AuthContext);

    // Verifica se o contexto foi usado fora do AuthProvider
    if (user === undefined) {
        throw new Error("useUserContext must be used within an AuthProvider");
    }

    // Verifica se o valor é um tipo específico (se houver uma propriedade 'status')
    if (user && 'status' in user) {
        throw new Error("useUserContext must is UserNotFound type");
    }

    // Retorna o valor do contexto
    return user;
}

interface AuthProviderProps {
    children: ReactNode; // Define os tipos das propriedades que o AuthProvider aceitará
}

// Componente AuthProvider que fornece o contexto para seus filhos
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<AuthContextType>(null); // Estado para armazenar os dados do usuário
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

    useEffect(() => {
        // Função assíncrona para verificar e buscar os dados do usuário
        const verifyUser = async () => {
            try {
                // Obtém o token armazenado
                const token = await AsyncStorage.getItem(env.pass_key);
                if (token) {
                    // Busca os dados do usuário com o token
                    const fetchedUser = await fetchAccount(token);
                    setUser(fetchedUser); // Atualiza o estado com os dados do usuário
                } else {
                    // Se não houver token, define o usuário como null
                    setUser(null);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUser(null); // Em caso de erro, define o usuário como null
            } finally {
                setLoading(false); // Define o carregamento como concluído
            }
        };

        verifyUser(); // Executa a função de verificação do usuário
    }, []); // Dependência vazia para executar o efeito apenas uma vez

    // Se estiver carregando, exibe um indicador de carregamento
    if (loading) {
        const styles = StyleSheet.create({
            loadingContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff', // Ajuste baseado no design
            },
        });

        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.default.tint} />
            </View>
        );
    }

    // Fornece o contexto com o valor do usuário para os componentes filhos
    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
}
