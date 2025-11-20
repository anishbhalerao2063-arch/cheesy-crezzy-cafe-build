-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS set_order_number_trigger ON public.orders;
DROP FUNCTION IF EXISTS public.set_order_number();
DROP FUNCTION IF EXISTS public.generate_order_number();

-- Create an improved order number generation function with advisory locking
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  new_order_number TEXT;
  counter INTEGER;
  date_prefix TEXT;
BEGIN
  -- Use advisory lock to prevent race conditions
  PERFORM pg_advisory_xact_lock(hashtext('order_number_generation'));
  
  date_prefix := 'CC' || TO_CHAR(NOW(), 'YYYYMMDD');
  
  -- Find the highest counter for today
  SELECT COALESCE(MAX(CAST(RIGHT(order_number, 4) AS INTEGER)), 0) + 1
  INTO counter
  FROM public.orders
  WHERE order_number LIKE date_prefix || '%';
  
  new_order_number := date_prefix || LPAD(counter::TEXT, 4, '0');
  
  RETURN new_order_number;
END;
$$;

-- Recreate the trigger function
CREATE OR REPLACE FUNCTION public.set_order_number()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER set_order_number_trigger
BEFORE INSERT ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.set_order_number();