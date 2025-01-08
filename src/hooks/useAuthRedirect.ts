import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/review-contract');
      }
    };
    checkSession();
  }, [navigate]);

  return {
    redirectToReviewContract: () => navigate('/review-contract'),
  };
};