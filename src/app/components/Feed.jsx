import { useContext, useState } from 'react';
import { Button, Box, ButtonGroup, Modal, Typography } from '@mui/material';
import { PostContext } from '../context/post-context';
import { PostFeed } from './PostFeed';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4,
};

const Feed = () => {
  const { posts, deletePosts } = useContext(PostContext);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const handleDeleteModal = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    await deletePosts(id);
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Are You Sure?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This Action Cannot Be Rolled Back
          </Typography>
          <ButtonGroup>
            <Button onClick={handleDelete}>Yes</Button>
            <Button color="error" onClick={() => setOpen(false)}>
              No
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
      {posts.map((post) => (
        <PostFeed key={post.id} post={post} handleDeleteModal={handleDeleteModal} />
      ))}
    </div>
  );
};

export default Feed;
