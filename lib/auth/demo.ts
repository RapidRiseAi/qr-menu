import { APP_CONFIG } from "@/lib/constants";
import { createServiceClient } from "@/lib/supabase/server";

const DEMO_BRANCH_ID = "22222222-2222-2222-2222-222222222222";
const DEMO_ADMIN_NAME = "Demo Branch Admin";

export function isDemoBranchCredential(email: string, password: string) {
  return (
    email.trim().toLowerCase() === APP_CONFIG.demoEmail.toLowerCase() &&
    password === APP_CONFIG.demoPassword
  );
}

export async function ensureDemoBranchAdmin() {
  const supabase = await createServiceClient();
  const userId = await ensureDemoAuthUser(supabase);

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: userId,
      full_name: DEMO_ADMIN_NAME,
      role: "branch_admin",
    },
    { onConflict: "id" },
  );

  if (profileError) throw profileError;

  const { error: membershipError } = await supabase.from("branch_users").upsert(
    {
      branch_id: DEMO_BRANCH_ID,
      user_id: userId,
      role: "branch_admin",
      is_active: true,
    },
    { onConflict: "branch_id,user_id" },
  );

  if (membershipError) throw membershipError;
}

async function ensureDemoAuthUser(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
) {
  const existingUserId = await findUserIdByEmail(
    supabase,
    APP_CONFIG.demoEmail,
  );

  if (existingUserId) return updateDemoAuthUser(supabase, existingUserId);

  const {
    data: { user },
    error,
  } = await supabase.auth.admin.createUser({
    email: APP_CONFIG.demoEmail,
    password: APP_CONFIG.demoPassword,
    email_confirm: true,
    user_metadata: { full_name: DEMO_ADMIN_NAME },
  });

  if (error) {
    const userId = await findUserIdByEmail(supabase, APP_CONFIG.demoEmail);
    if (userId) return updateDemoAuthUser(supabase, userId);
    throw error;
  }

  if (!user) throw new Error("Supabase did not return the demo auth user.");
  return user.id;
}

async function updateDemoAuthUser(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
  userId: string,
) {
  const { error } = await supabase.auth.admin.updateUserById(userId, {
    password: APP_CONFIG.demoPassword,
    email_confirm: true,
    user_metadata: { full_name: DEMO_ADMIN_NAME },
  });

  if (error) throw error;
  return userId;
}

async function findUserIdByEmail(
  supabase: Awaited<ReturnType<typeof createServiceClient>>,
  email: string,
) {
  const normalizedEmail = email.toLowerCase();
  const perPage = 1000;

  for (let page = 1; page <= 10; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage,
    });

    if (error) throw error;

    const user = data.users.find(
      (candidate) => candidate.email?.toLowerCase() === normalizedEmail,
    );

    if (user) return user.id;
    if (data.users.length < perPage) return null;
  }

  return null;
}
