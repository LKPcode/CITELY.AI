import { ref } from 'vue'
import { User } from '@/types'
import supabase from '../api/supabase_instance'


const user = ref<User|null>(null)

let channelA = supabase
                .channel('schema-db-changessss')
                .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'user',
                },
                (payload) => {
                    console.log('Change received!', payload)
                    let updated_user = payload.new;
                    user.value = updated_user
                }
                )
                .subscribe()




export default function useUserStore() {

    const setUser = (newUser: User) => {
        user.value = newUser
    }




    return {
        user,
        setUser    
    }
}