'use client';
import { useState } from 'react';
import useClient, { prefix } from '../rest-client/index';

export const usePostService = () => {
  const collection = `${prefix}_post`;
  const client = useClient();
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    if (loading) return setLoading(true);
    return client
      .get(collection, {
        params: {
          sort: '-timestamp',
        },
      })
      .then((response) => {
        return response.data;
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const createPosts = async (post, user) => {
    if (loading) return setLoading(true);
    return client
      .post(collection, { post, timestamp: new Date(), user })
      .then((response) => {
        return response.data;
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const deletePosts = async (id) => {
    if (loading) return setLoading(true);
    return client
      .delete(`${collection}/id/${id}`)
      .then((response) => {
        return response.data;
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const updatePosts = async (id, post) => {
    if (loading) return setLoading(true);
    return client
      .put(`/collection/id/${id}`, post)
      .then((response) => {
        return response.data;
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { getPosts, createPosts, deletePosts, updatePosts, loading };
};
export default usePostService;
