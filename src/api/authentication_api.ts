import supabase from "./supabase_instance";

// Register a new user
const register = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    // If error then throw it
    if (error) throw error;

    return data;
}

// Login a user
const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    // If error then throw it
    if (error) throw error;


    return { data, error };
}


export default {
    register,
    login
}


