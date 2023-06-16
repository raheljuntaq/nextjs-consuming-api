'use client';
import { useState } from 'react';
import { Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import usePostService from '../services/post';
import { useJwt } from 'react-jwt';
import { useLocalStorage } from '../hooks/localStorage';

const PostForm = () => {
  const [credential] = useLocalStorage('credential');
  const { decodedToken, isExpired } = useJwt(credential);
  const [post, setPost] = useState();
  const { createPosts, loading } = usePostService();

  const handleCreatePosts = async () => {
    await createPosts(post, decodedToken);
    setPost('');
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Post New Feed</Typography>
        <TextField multiline placeholder="post" value={post} onChange={(e) => setPost(e.target.value)} />
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleCreatePosts}>
          {loading && <CircularProgress />}Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostForm;
