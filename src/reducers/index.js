import {
  FETCH_PASSAGE_START,
  FETCH_PASSAGE_SUCCESS,
  FETCH_PASSAGE_FAILURE,
  CLEAR_SWAPS,
  USE_CONTENT_STORE
} from '../actions'

const initState = {
  isFetching: false,
  error: '',
  content: {
    'KJV': {
      'Philippians': {
        '1': {
          allVerses: [1, 2, 3, 4, 5, 6, 7],
          verses: {
            '1': 'Paul and Timotheus, the servants of Jesus Christ, to all the saints in Christ Jesus which are at Philippi, with the bishops and deacons:',
            '2': 'Grace be unto you, and peace, from God our Father, and from the Lord Jesus Christ.',
            '3': 'I thank my God upon every remembrance of you,',
            '4': 'Always in every prayer of mine for you all making request with joy,',
            '5': 'For your fellowship in the gospel from the first day until now;',
            '6': 'Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ:',
            '7': 'Even as it is meet for me to think this of you all, because I have you in my heart; inasmuch as both in my bonds, and in the defence and confirmation of the gospel, ye all are partakers of my grace.'
          }
        }
      }
    },
    'NET': {
      'Philippians': {
        '1': {
          allVerses: [1, 2, 3, 4, 5, 6, 7],
          verses: {
            '1': 'From Paul and Timothy, slaves of Christ Jesus, to all the saints in Christ Jesus who are in Philippi, with the overseers and deacons.',
            '2': 'Grace and peace to you from God our Father and the Lord Jesus Christ!',
            '3': 'I thank my God every time I remember you.',
            '4': 'I always pray with joy in my every prayer for all of you',
            '5': 'because of your participation in the gospel from the first day until now.',
            '6': 'For I am sure of this very thing, that the one who began a good work in you will perfect it until the day of Christ Jesus.',
            '7': 'For it is right for me to think this about all of you, because I have you in my heart, since both in my imprisonment and in the defense and confirmation of the gospel all of you became partners in God’s grace together with me.'
          }
        }
      }
    }
  },
  passage: {
    bible: 'KJV',
    book: 'Philippians',
    chapter: '1',
    verseRange: '1–7',
    swappedVerses: [
      {
        'verse': 3,
        'bible': 'NET'
      },
      {
        'verse': 6,
        'bible': 'NET'
      }
    ]
  },
  bibles: [
    {
      id: 'ESV',
      display: 'English Standard Version'
    },
    {
      id: 'NET',
      display: 'New English Bible'
    },
    {
      id: 'KJV',
      display: 'King James Version'
    },
    {
      id: 'ASV',
      display: 'American Standard Version'
    },
    {
      id: 'DARBY',
      display: '1890 Darby Bible'
    },
    {
      id: 'LEB',
      display: 'Lexham English Bible'
    },
    {
      id: 'YLT',
      display: `Young's Literal Bible`
    }  
  ]
}

export default (state = initState, action) => {
  switch (action.type) {
    case CLEAR_SWAPS:
      return {
        ...state,
        passage: {
          ...state.passage,
          swappedVerses: []
        }
      }
    case USE_CONTENT_STORE:
      return {
        ...state,
        passage: {
          ...state.passage,
          bible: action.payload
        }
      }
    case FETCH_PASSAGE_START:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_PASSAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        content: {
          ...state.content,
          ...action.payload.content
        },
        passage: {
          ...state.passage,
          bible: action.payload.passage.bible,
          book: action.payload.passage.book,
          chapter: action.payload.passage.chapter
        }
      }
    case FETCH_PASSAGE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    default:
      return state
  }
}