import { supabase } from "@/utils/supabase/client";

const HomePage = async () => {
  const user = await supabase.auth.getUser();

  console.log(user);
  return (
    <>
      <h1>Page should only be accessed by authenticated users</h1>
    </>
  );
};

export default HomePage;
