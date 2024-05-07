import React, {useCallback, useState} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import styles from './savedStyle';

const SavedPosts: React.FC = () => {
  const savedPosts = useSelector(
    (state: RootState) => state.savedPosts.savedPosts,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const renderEmptyComponent = () => (
    <View style={styles.centeredView}>
      <Text style={styles.emptyMessage}>No Saved Posts</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={savedPosts.slice(0, 10 * page)}
        keyExtractor={item => item._id}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => (
          <View style={styles.postContainer}>
            <Text style={styles.title}>{item.title}</Text>
            {item.image_url && (
              <Image source={{uri: item.image_url}} style={styles.image} />
            )}
          </View>
        )}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

export default SavedPosts;
