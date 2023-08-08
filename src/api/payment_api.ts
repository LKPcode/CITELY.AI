import supabase from "./supabase_instance";

const getCheckoutSession = async (priceId: string) => {
    const { data, error } = await supabase.functions.invoke("create-stripe-checkout", {
        body: { planId: priceId },
    });

    if (error) {
        throw error;
    }

    return data;
}


export default {
    getCheckoutSession,
};
