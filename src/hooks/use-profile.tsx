import { useEffect, useState } from "react";
import useRequest from "./use-request";
import { Profile } from "@/types/user";

const useProfile = () => {
  const {
    loading: profileLoad,
    error: profileError,
    makeRequest,
  } = useRequest("/creators/profile?page=1&limit=100");
  const [profileRes, setProfileRes] = useState<null | Profile>(null);

  const fetchProfile = async () => {
    const res = await makeRequest();
    if (res.status === "success") {
      console.log("Profile res:", res);
      setProfileRes(res.data);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return { profileRes, profileError, profileLoad, fetchProfile };
};

export default useProfile;
