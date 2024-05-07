import {useState, useEffect, useCallback, useRef} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetAuthState,
  selectAccessToken,
  selectRefreshToken,
  setAccessToken,
} from '../redux/authSlice';
import {savePost, unsavePost} from '../redux/savedPostsSlice';
import {api} from '../utils/api';

interface Post {
  _id: string;
  title: string;
  link: string;
  image_url?: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const useNews = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const flatListRef = useRef(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [tokenRefreshed, setTokenRefreshed] = useState<boolean>(false);

  const fetchNewAccessToken = useCallback(async () => {
    try {
      const response = await axios.post(`${api}refresh-token`, {
        refreshToken,
        token_expires_in: '0.2m',
      });
      const newAccessToken = response.data.accessToken;
      dispatch(setAccessToken(newAccessToken));
      setTokenRefreshed(true);
    } catch (error) {}
  }, [refreshToken, dispatch]);

  useEffect(() => {
    if (accessToken) {
      fetchPosts();
    }
  }, [accessToken, pagination.currentPage]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}posts`, {
        params: {page: pagination.currentPage, pageSize: 10},
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      const newPosts = response.data.results;
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPagination({
        currentPage: response.data.pagination.currentPage,
        totalPages: response.data.pagination.totalPages,
        hasNextPage: response.data.pagination.hasNextPage,
        hasPrevPage: response.data.pagination.hasPrevPage,
      });
      setError(null);
    } catch (error: any) {
      if (!tokenRefreshed && error.response && error.response.status === 403) {
        await fetchNewAccessToken();
      } else {
        dispatch(resetAuthState());
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSavePost = (post: Post) => {
    const isPostSaved = savedPosts.includes(post._id);
    if (isPostSaved) {
      dispatch(unsavePost(post._id));
      setSavedPosts(savedPosts.filter(id => id !== post._id));
    } else {
      dispatch(savePost(post));
      setSavedPosts([...savedPosts, post._id]);
    }
  };

  const handleEndReached = () => {
    if (pagination.hasNextPage && !loading) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPosts([]);
    setPagination({
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    });
  };

  return {
    posts,
    pagination,
    loading,
    error,
    savedPosts,
    flatListRef,
    refreshing,
    handleSavePost,
    handleEndReached,
    handleRefresh,
  };
};
