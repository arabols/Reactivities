import { createContext, useContext } from "react"
import ActivityStore from "./activityStore"
import CommentStore from "./commentStore"
import CommonStore from "./commonStore"
import ModalStore from "./modalStore"
import ProfileStore from "./profileStore"
import UserStore from "./userStore"

interface Store {
    activityStore: ActivityStore
    commonStore: CommonStore
    userStore: UserStore
    modalStore: ModalStore
    profileStore: ProfileStore,
    commentStore: CommentStore
}

export const store: Store = {
    userStore: new UserStore(),
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}