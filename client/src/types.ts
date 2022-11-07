export interface Post {
    username: string,
    userImg: string,
    id: number,
    title: string,
    desc: string,
    img: string,
    date: Date,
    uid: number,
    cat?: string | null
}

export interface MenuProps {
    cat: string | undefined | null
}