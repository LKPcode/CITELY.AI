import supabase from "./supabase_instance";

const getUserData = async () => {
    const { data, error } = await supabase.from("user").select("*").single();


    if (error) {
        throw error;
    }

    console.log("user", data);


    return data;
}



export default {
    getUserData,
};
