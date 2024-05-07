import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useNews} from '../../hooks/useNews';
import styles from './NewsStyle';
const saveIcon = require('../../assets/save.png');
const savedIcon = require('../../assets/saved.png');
const defaultImage = require('../../assets/logo.png');

const News: React.FC = () => {
  const {
    posts,
    loading,
    error,
    savedPosts,
    flatListRef,
    refreshing,
    pagination,
    handleSavePost,
    handleEndReached,
    handleRefresh,
  } = useNews();

  const renderLoader = () => {
    if (!loading && !pagination.hasNextPage) {
      return null;
    }
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={posts}
      keyExtractor={(item, index) => item._id + index.toString()}
      renderItem={({item}) => (
        <View style={styles.postContainer}>
          <View style={styles.postContent}>
            <Text
              style={styles.title}
              onPress={() => Linking.openURL(item.link)}>
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => handleSavePost(item)}>
              <Image
                source={savedPosts.includes(item._id) ? savedIcon : saveIcon}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={item.image_url ? {uri: item.image_url} : defaultImage}
            style={styles.image}
          />
        </View>
      )}
      ListHeaderComponent={
        error ? () => <Text style={styles.error}>Error: {error}</Text> : null
      }
      ListFooterComponent={renderLoader}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#0000ff']}
          tintColor="#0000ff"
        />
      }
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

export default News;
