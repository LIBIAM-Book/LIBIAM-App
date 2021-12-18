import React, { createContext, useReducer } from 'react';
import { bookDataReducer } from '../util/bookDataReducer';

// Initialize with mock data
// const mockData = {
//   cover: {
//     id: 0,
//     pageType: 'front',
//     Text: "Edward's Adventure",
//     MediaImgUris: ['/src/assets/Peaceful_Valley.jpg'],
//   },
//   firstPage: {
//     id: 1,
//     pageType: 'body',
//     Text: 'He saw a ferry bound for London at two o’clock in the afternoon; and after breakfast he went out on one side of the river until it came to a little farm-house, where he found Mr.',
//     MediaImgUris: [
//       '/src/assets/warm-glow-of-venice-gleb-goloubetski.jpg',
//       's3://DOC-EXAMPLE-BUCKET/your-image-file-2',
//       's3://DOC-EXAMPLE-BUCKET/your-image-file-3',
//       's3://DOC-EXAMPLE-BUCKET/your-image-file-4',
//     ],
//   },
//   secondPage: {
//     id: 2,
//     pageType: 'body',
//     Text: 'At noon he mounted a horse and rode along the river until he came to a little ferry-boat by the side of an old stream that flowed between two large ferries on one side and a small brook at the other.',
//     MediaImgUris: [
//       '/src/assets/riverside.jpg',
//       's3://DOC-EXAMPLE-BUCKET/your-image-file-6',
//       's3://DOC-EXAMPLE-BUCKET/your-image-file-7',
//       's3://DOC-EXAMPLE-BUCKET/your-image-file-8',
//     ],
//   },
//   thirdPage: {
//     id: 3,
//     pageType: 'body',
//     Text: 'The next afternoon he went out into the river to see for himself whether it would be a good breeze or not; but at half past nine o’clock in the afternoon he came upon one of the ferry-carriages that were standing on the opposite side of the river, and saw them coming towards him as soon as they could reach their destination.',
//     MediaImgUris: [
//       '/src/assets/warm-feelings-ashley-harris.jpg',
//       's3://DOC-EXAMPLE-BUCKET/your-image-file-10',
//       's3://DOC-EXAMPLE-BUCKET/your-image-file-11',
//       's3://DOC-EXAMPLE-BUCKET/your-image-file-12',
//     ],
//   },
//   end: {
//     id: 4,
//     pageType: 'end',
//     Text: 'The end',
//     MediaImgUris: [
//       '/src/assets/end.jpeg',
//       's3://DOC-EXAMPLE-BUCKET/your-image-file-14',
//       's3://DOC-EXAMPLE-BUCKET/your-image-file-15',
//       's3://DOC-EXAMPLE-BUCKET/your-image-file-16',
//     ],
//   },
// };

// INITIAL DATA THAT WILL BE USED IN PRODUCTION
const initialData = {
  cover: {
    id: 0,
    pageType: '',
    Text: '',
    MediaImgUris: [],
  },
  firstPage: {
    id: 1,
    pageType: '',
    Text: '',
    MediaImgUris: [],
  },
  secondPage: {
    id: 2,
    pageType: '',
    Text: '',
    MediaImgUris: [],
  },
  thirdPage: {
    id: 3,
    pageType: '',
    Text: '',
    MediaImgUris: [],
  },
  end: {
    id: 4,
    pageType: '',
    Text: '',
    MediaImgUris: [],
  },
};

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [bookContent, bookContentDispatch] = useReducer(
    bookDataReducer,
    initialData
  );

  return (
    <BookContext.Provider value={{ bookContent, bookContentDispatch }}>
      {children}
    </BookContext.Provider>
  );
};
