import supabase from "./supabase";

type UserProfileUpdate = {
  current_module?: string;
};

export async function updateUserProfile(
  userId: string,
  data: UserProfileUpdate
) {
  const { error } = await supabase
    .from("user_profiles")
    .update(data)
    .eq("id", userId);

  if (error) throw error;
}
