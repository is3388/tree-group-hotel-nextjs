import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/* the separation of concerns between client-side and server-side logic 
SSR/SSG best practices. This approach ensures secure handling 
of authentication tokens and other sensitive information on the server side, 
leading to better performance and security. Implementing the server-client separation
allows for a more scalable and maintainable codebase, especially in larger applications

export function createClient() {

const cookieStore = cookies();

return createServerClient(

process.env.NEXT_PUBLIC_SUPABASE_URL,

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

  { other options  } )

}

*/