export type User = {
    id: number
    name: string
    email: string
    password: string
    address: string
    phone: string

}
export type Action = {
    data: User,
    type: 'update' | 'get' | 'create'
}
export type Context = {
    user: User,
    userDispatch: React.Dispatch<any>
}
export type Recipe =
    {
        id?: number,
        title?: string,
        description?: string,
        authorId?: number,
        ingredients?: string[],
        instructions?: string

    }
export function userReducer(state: User, data: Action): User {
    switch (data.type) {
        case 'create':
            const { id, name, email, password, address, phone } = data.data as User
            return {
                id: id,
                name: name,
                email: email,
                password: password,
                address: address,
                phone: phone
            }
        case 'update':
            return {
                id: state.id,
                name: data.data.name || state.name,
                email: data.data.address || state.email,
                password: data.data.password || state.password,
                address: data.data.address || state.address,
                phone: data.data.phone || state.phone,
            }
        default:
            return state

    }
}