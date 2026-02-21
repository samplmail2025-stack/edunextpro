
-- Add DOB column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS dob date;

-- Recreate the trigger that was missing
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
