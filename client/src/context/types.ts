export type CurrentUser = {
    username: string;
    id?: number;
    email?: string,
    img: string | null

}

export type UserContextType = {
    currentUser: CurrentUser,
    setCurrentUser: (value: CurrentUser) => void,
    login: (value: any) => Promise<void>,
    logout: (value: any) => Promise<void>
}