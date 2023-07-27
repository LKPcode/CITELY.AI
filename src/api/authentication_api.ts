import supabase from "./supabase_instance";

let localUser;
let temp;

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

async function getUser(next) {
    localUser = await supabase.auth.getSession();
      if ( localUser.data.session == null) {
          next('/')
      }
      else {
        next();
      }
     localUser.data.session = temp;
  }


  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

export default {
    register,
    login,
    localUser,
    temp,
    getUser,
    logout
}


