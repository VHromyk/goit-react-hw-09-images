import axios from 'axios';

const fetchImages = ({ searchQuery = '', currentPage = 1, perPage = 12 }) => {
  const token = '19790179-de8e0f050de34d9c55fd8172a';

  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${token}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
    )
    .then(response => response.data.hits);
};

export default { fetchImages };
