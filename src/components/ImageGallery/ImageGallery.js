import React, { useState, useEffect } from 'react';
import imagesApi from '../../services/images-api';
import Searchbar from '../../components/Searchbar';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import './ImageGallery.scss';
import Container from '../Container';
import Modal from '../Modal';
import Spiner from '../Spiner';

// class ImageGallery extends Component {
//   state = {
//     hits: [],
//     searchQuery: '',
//     currentPage: 1,
//     perPage: 12,
//     isLoading: false,
//     error: null,
//     showModal: false,
//     largeImageURL: '',
//     largeImageALT: '',
//     scroll: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.searchQuery !== prevState.searchQuery) {
//       this.fetchImages();
//     }
//   }

//   onChangeQuery = query => {
//     this.setState({
//       searchQuery: query,
//       currentPage: 1,
//       hits: [],
//       error: null,
//       showModal: false,
//     });
//   };

//   fetchImages = () => {
//     const { searchQuery, currentPage, perPage } = this.state;

//     const options = {
//       searchQuery,
//       currentPage,
//       perPage,
//     };

//     this.setState({
//       isLoading: true,
//     });

//     imagesApi
//       .fetchImages(options)
//       .then(hits => {
//         this.setState(prevState => ({
//           hits: [...prevState.hits, ...hits],
//           currentPage: prevState.currentPage + 1,
//           scroll: true,
//         }));
//       })
//       .catch(error => this.setState({ error }))
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   toggleModal = (url, alt) => {
//     this.setState(prevState => ({
//       showModal: !prevState.showModal,
//       largeImageURL: url,
//       largeImageALT: alt,
//     }));
//   };

//   render() {
//     const {
//       hits,
//       isLoading,
//       error,
//       showModal,
//       largeImageURL,
//       largeImageALT,
//       scroll,
//     } = this.state;
//     const shouldRenderLoadMoreBtn = hits.length > 0 && !isLoading;
//     return (
//       <>
//         <Searchbar onSubmit={this.onChangeQuery} />
//         {error && <h1>Что-то пошло не так!</h1>}
//         <Container>
//           <ul className="ImageGallery">
//             {hits.map(item => (
//               <ImageGalleryItem
//                 img={item.webformatURL}
//                 alt={item.tags}
//                 key={item.id}
//                 onClick={() => this.toggleModal(item.largeImageURL, item.tags)}
//               />
//             ))}
//           </ul>
//           {scroll &&
//             window.scrollTo({
//               top: document.documentElement.scrollHeight,
//               behavior: 'smooth',
//             })}
//           {isLoading && <Spiner />}
//           {shouldRenderLoadMoreBtn && <Button onClick={this.fetchImages} />}
//         </Container>
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={largeImageURL} alt={largeImageALT} />
//           </Modal>
//         )}
//       </>
//     );
//   }
// }

// export default ImageGallery;

export default function ImageGallery() {
  const [hits, setHits] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [largeImageALT, setLargeImageALT] = useState('');
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [searchQuery]);

  const onChangeQuery = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setHits([]);
  };

  const fetchImages = () => {
    const options = {
      searchQuery,
      currentPage,
      perPage,
    };
    setIsLoading(true);

    imagesApi
      .fetchImages(options)
      .then(hits => {
        setHits(prevHits => [...prevHits, ...hits]);
        setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
        setScroll(true);
      })
      .catch(error => setError({ error }))
      .finally(setIsLoading(false));
  };

  const toggleModal = (url, alt) => {
    setShowModal(!showModal);
    setLargeImageURL(url);
    setLargeImageALT(alt);
  };

  const shouldRenderLoadMoreBtn = hits.length > 0 && !isLoading;

  return (
    <>
      <Searchbar onSubmit={onChangeQuery} />
      {error && <h1>Что-то пошло не так!</h1>}
      <Container>
        <ul className="ImageGallery">
          {hits.map(item => (
            <ImageGalleryItem
              img={item.webformatURL}
              alt={item.tags}
              key={item.id}
              onClick={() => toggleModal(item.largeImageURL, item.tags)}
            />
          ))}
        </ul>
        {scroll &&
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          })}
        {isLoading && <Spiner />}
        {shouldRenderLoadMoreBtn && <Button onClick={fetchImages} />}
      </Container>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={largeImageALT} />
        </Modal>
      )}
    </>
  );
}
