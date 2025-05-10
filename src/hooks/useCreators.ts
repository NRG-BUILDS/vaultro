import { useEffect, useState } from "react";
import useRequest from "./use-request";

export type CreatorTypes = {
  name: string;
  id: string;
  slug: string;
};
const useCreators = () => {
  const {
    loading: creatorTypeLoad,
    error: creatorTypeError,
    makeRequest,
  } = useRequest("/creators/types", false);
  const {
    loading: contentTypeLoad,
    error: contentTypeError,
    makeRequest: requestContentTypes,
  } = useRequest("/creators/content-types", false);
  const {
    loading: creatorNicheLoad,
    error: creatorNicheError,
    makeRequest: requestCreatorNiches,
  } = useRequest("/creators/niches", false);
  const [creatorTypes, setCreatorTypes] = useState<null | CreatorTypes[]>(null);
  const [creatorNiches, setCreatorNiches] = useState<null | CreatorTypes[]>(
    null
  );
  const [contentTypes, setContentTypes] = useState<null | CreatorTypes[]>(null);

  const fetchCreatorTypes = async () => {
    const res = await makeRequest();
    if (res.status === "success") {
      setCreatorTypes([...res.data]);
    }
  };
  const fetchCreatorNiches = async () => {
    const res = await requestCreatorNiches();
    if (res.status === "success") {
      setCreatorNiches([...res.data]);
    }
  };
  const fetchContentTypes = async () => {
    const res = await requestContentTypes();
    if (res.status === "success") {
      setContentTypes([...res.data]);
    }
  };
  useEffect(() => {
    fetchCreatorTypes();
    fetchContentTypes();
    fetchCreatorNiches();
  }, []);

  return {
    creatorTypes,
    creatorNiches,
    contentTypes,
    fetchCreatorTypes,
    //loading states
    creatorTypeLoad,
    creatorNicheLoad,
    contentTypeLoad,
    //error
    creatorTypeError,
    creatorNicheError,
    contentTypeError,
  };
};

export default useCreators;
