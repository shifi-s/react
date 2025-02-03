export type User = {
    id:number
    name: string,

}
export type Action = {
    data: User, 
    type: 'update' | 'get' | 'create'
}
export type Context = {
    user: User,
    userDispatch: React.Dispatch<any>
}
export type Recipe=
{
    id?: number,
    title?: string,
    description?: string,
    authorId?: number,
    ingredients?:string[],
    instructions?: string
    
}
export function userReducer(state: User, data: Action): User {
    switch (data.type) {
        case 'create':
            const { id,name} = data.data as User
            return {
                id:id,
                name: name
            }
        case 'update':
            return {
                id:data.data.id,
                name: data.data.name||state.name
                
            }
        default:
            return state

    }
}