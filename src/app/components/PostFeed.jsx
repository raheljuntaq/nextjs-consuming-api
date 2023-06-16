'use client';
import { Button } from '@mui/base';
import { Avatar, ButtonGroup, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import TimeAgo from 'timeago-react';
import { PostContext } from '../context/post-context';

const PostFeed = ({ post, handleDeleteModal }) => {
  const [_post, setPost] = useState(post);
  const { updatePosts } = useContext(PostContext);
  const [editStatus, setEditStatus] = useState(false);

  const handleEditChange = ({ target: { value } }) => {
    setPost(value);
  };

  const handleSubmitUpdate = async () => {
    await updatePosts(post.id, {
      ...post,
      post: _post,
    });
    setEditStatus(false);
  };

  return (
    <Card key={post.created} styl={{ marginBottom: 20, border: '1px, solid red' }}>
      <CardContent style={{ textAlign: 'left' }}>
        <Grid container>
          <Grid xl={1}>
            <Avatar alt={post.user.name} src={post.user.picture} />
          </Grid>
          <Grid xl={7}>
            <Typography>{post.user.name}</Typography>
          </Grid>
          <Grid xl={4} style={{ textAlign: 'right' }}>
            <Typography>
              <TimeAgo datetime={post.created} locale="id_ID" />
            </Typography>
          </Grid>
        </Grid>
        {!editStatus && post.post}
        {editStatus && (
          <>
            <TextField value={_post.post} multiline onChange={handleEditChange} />
            <Button onClick={handleSubmitUpdate}>Submit</Button>
          </>
        )}
      </CardContent>
      <div>
        <ButtonGroup>
          <Button onClick={() => setEditStatus(!editStatus)}>Edit</Button>
          <Button color="error" onClick={() => handleDeleteModal(post.id)}>
            Delete
          </Button>
        </ButtonGroup>
      </div>
    </Card>
  );
};

export default PostFeed;
