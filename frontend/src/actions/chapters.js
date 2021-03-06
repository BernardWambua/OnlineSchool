import axios from "axios";
import { GET_CHAPTERS, ADD_CHAPTER, DELETE_CHAPTER } from "./types";

// Get Chapters
export const getChapters = () => dispatch => {
    axios.get('/chapters/')
        .then(res => {
            dispatch({
                type: GET_CHAPTERS,
                payload: res.data
            });
        }).catch(err => console.log(err));
};

// Delete Chapter
export const deleteChapter = (id) => dispatch => {
    axios.delete(`/chapters/${id}/`)
        .then(res => {
            dispatch({
                type: DELETE_CHAPTER,
                payload: id
            });
        }).catch(err => console.log(err));
};

// Add Chapter
export const addChapter = (chapter) => dispatch => {
    axios.post('/chapters/', chapter, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
        .then(res => {
            dispatch({
                type: ADD_CHAPTER,
                payload: res.data
            });
        }).catch(err => console.log(err));
};
