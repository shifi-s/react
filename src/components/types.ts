export type User = {
    name: string,
    password: string,
    address: string,
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
export function userReducer(state: User, data: Action): User {
    switch (data.type) {
        case 'create':
            const { name, password } = data.data as Partial<User>
            return {
                name: name || ' ',
                password: password || ' ',
                address: '',
                phone: ''
            }
        case 'update':
            return {
                name: data.data.name,
                password: data.data.password,
                address: data.data.address || state.address,
                phone: data.data.address || state.phone
            }
        default:
            return state

    }
}