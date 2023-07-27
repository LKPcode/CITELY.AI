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

//Get User 
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


// google Authentication 

  async function googleAuth() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:5173/workspace/0/chat/0'
        }
      })
    
    if (error) throw error;

    return {data,error}
  }
  
  

export default {
    register,
    login,
    localUser,
    temp,
    getUser,
    googleAuth,
    logout
}


