// Like.js (updated addLikeHandler function)

import React from 'react';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { serverUrl } from './Server';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button, Modal, message } from 'antd';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

function Like({ id, refresh }) {
  const { authTokens } = useAuth();
  const { likes, updateLikes } = useGlobalState();
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);


  const addLikeHandler = async () => {
    try {
      if (!authTokens) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${serverUrl}/api/listings/business-page-like/${id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },
        // You can include a request body if needed
      });
      const data = await response.json();
      if (response.status === 200) {
        // message.info("Disliked");
        updateLikes();
        refresh()
      } else if (response.status === 201) {
        // message.success(data.msg);
        updateLikes();
        refresh()
      }
      else if (response.status === 401) {
        // Unauthorized - Redirect to login page
        router.push('/login');
      }
      else {
        throw new Error('Failed to add like');
      }
    } catch (error) {
      console.error('Error adding like:', error);
      Modal.error({
        title: 'Error',
        content: 'Failed to add like. Please try again later.',
      });
    }
  };



  return (
    <div>
      <Button
        size='large'
        shape='circle'
        icon={(likes? <FcLike />:<FcLikePlaceholder />)}
        onClick={addLikeHandler}
      />
    </div>
  );
}

export default Like;
