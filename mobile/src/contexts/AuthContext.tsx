import { createContext, ReactNode } from "react";

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    singIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

async function singIn() {
    console.log('Vamos logar!');
}

export function AuthContextProvider({ children }: AuthProviderProps) {
    return (
        <AuthContext.Provider value={{
            singIn,
            user: {
                name: 'Rodrigo Gonçalves',
                avatarUrl: 'https://github.com/rodrigorgtic.png',
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}