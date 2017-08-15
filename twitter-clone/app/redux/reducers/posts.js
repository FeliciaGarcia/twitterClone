export const loadPosts = () => dispatch => {
  return axios.get(`https://api.cosmicjs.com/v1/${cosmicConfig.bucket.slug}/object-type/posts`)
    .then(res => res.data.objects ? formatPosts(res.data.objects) : [])
    .then(formattedPosts => formattedPosts.sort(postSorter))
    .then(sortedPosts => dispatch(init(sortedPosts)))
    .catch(err => console.error(`Could not load posts`, err));
};
