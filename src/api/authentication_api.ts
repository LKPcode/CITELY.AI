import supabase from "./supabase_instance";

let localUser;
let temp;

supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'SIGNED_OUT') {
    console.log('SIGNED_OUT', session)
    document.location = '/'
}
})

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


    return data;
}

//Get User 
async function getUser() {
    localUser = await supabase.auth.getSession();
    return localUser;
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
          redirectTo: 'http://localhost:5173/home'
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


