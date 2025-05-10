import { useEffect, useState } from "react";
import useRequest from "./use-request";

export type Country = {
  name: string;
  id: string;
  code: string;
};
const useCountries = () => {
  const {
    loading: countryLoad,
    error: countryError,
    makeRequest,
  } = useRequest("/creators/countries", false);
  const [countries, setCountries] = useState<null | Country[]>(null);

  const fetchCountries = async () => {
    const res = await makeRequest();
    if (res.status === "success") {
      console.log("Country res:", res);
      setCountries([...res.data.flat()]);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  return { countries, countryError, countryLoad, fetchCountries };
};

export default useCountries;
