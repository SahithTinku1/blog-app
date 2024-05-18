import "./Article.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FcClock, FcCalendar, FcComments, FcPortraitMode } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdRestore } from "react-icons/md";
import { BiCommentAdd } from "react-icons/bi";
import { axiosWithToken } from "../../axiosWithToken";

function Article() {
  const { state } = useLocation();
  const { currentUser } = useSelector((state) => state.userAuthoruserAuthorLoginReducer);
  const { register, handleSubmit } = useForm();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const [articleEditStatus, setArticleEditStatus] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(state);

  const deleteArticle = async () => {
    const art = { ...currentArticle };
    delete art._id;
    const res = await axiosWithToken.put(
      `http://localhost:4000/author-api/article/${currentArticle.articleId}`, 
      art
    );
    if (res.data.message === 'article deleted') {
      setCurrentArticle({ ...currentArticle, status: res.data.payload });
    }
  };

  const restoreArticle = async () => {
    const art = { ...currentArticle };
    delete art._id;
    const res = await axiosWithToken.put(
      `http://localhost:4000/author-api/article/${currentArticle.articleId}`, 
      art
    );
    if (res.data.message === 'article restored') {
      setCurrentArticle({ ...currentArticle, status: res.data.payload });
    }
  };

  const writeComment = async (commentObj) => {
    commentObj.username = currentUser.username;
    const res = await axiosWithToken.post(
      `http://localhost:4000/user-api/comment/${state.articleId}`,
      commentObj
    );
    if (res.data.message === "Comment posted") {
      setComment(res.data.message);
    }
  };

  const enableEditState = () => {
    setArticleEditStatus(true);
  };

  const saveModifiedArticle = async (editedArticle) => {
    const modifiedArticle = { ...state, ...editedArticle };
    modifiedArticle.dateOfModification = new Date();
    delete modifiedArticle._id;

    const res = await axiosWithToken.put(
      "http://localhost:4000/author-api/article",
      modifiedArticle
    );
    if (res.data.message === "Article modified") {
      setArticleEditStatus(false);
      navigate(`/author-profile/article/${modifiedArticle.articleId}`, {
        state: res.data.article,
      });
    }
  };

  const ISOtoUTC = (iso) => {
    const date = new Date(iso);
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
  };

  return (
    <div className="article-container">
      {!articleEditStatus ? (
        <>
          <div className="d-flex justify-content-between">
            <div>
              <h1 className="display-3 me-4">{state.title}</h1>
              <div className="py-3">
                <small className="text-secondary me-4">
                  <FcCalendar className="fs-4" />
                  Created on: {ISOtoUTC(state.dateOfCreation)}
                </small>
                <small className="text-secondary">
                  <FcClock className="fs-4" />
                  Modified on: {ISOtoUTC(state.dateOfModification)}
                </small>
              </div>
            </div>
            {currentUser.userType === "author" && (
              <div>
                <button className="me-2 btn btn-warning" onClick={enableEditState}>
                  <CiEdit className="fs-2" />
                </button>
                {currentArticle.status ? (
                  <button className="me-2 btn btn-danger" onClick={deleteArticle}>
                    <MdDelete className="fs-2" />
                  </button>
                ) : (
                  <button className="me-2 btn btn-info" onClick={restoreArticle}>
                    <MdRestore className="fs-2" />
                  </button>
                )}
              </div>
            )}
          </div>
          <p className="lead mt-3 article-content">{state.content}</p>
          <div className="comments my-4">
            {state.comments.length === 0 ? (
              <p className="display-3">No comments yet...</p>
            ) : (
              state.comments.map((commentObj, ind) => (
                <div key={ind} className="bg-light p-3">
                  <p className="fs-4 text-capitalize text-primary">
                    <FcPortraitMode className="fs-2 me-2" />
                    {commentObj.username}
                  </p>
                  <p className="ps-4 text-info" style={{ fontFamily: "fantasy" }}>
                    <FcComments className="me-2" />
                    {commentObj.comment}
                  </p>
                </div>
              ))
            )}
          </div>
          <h1>{comment}</h1>
          {currentUser.userType === "user" && (
            <form onSubmit={handleSubmit(writeComment)}>
              <input
                type="text"
                {...register("comment")}
                className="form-control mb-4"
                placeholder="Write comment here...."
              />
              <button type="submit" className="btn btn-success">
                Add a Comment <BiCommentAdd className="fs-3" />
              </button>
            </form>
          )}
        </>
      ) : (
        <form onSubmit={handleSubmit(saveModifiedArticle)}>
          <div className="mb-4">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              {...register("title")}
              defaultValue={state.title}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="form-label">Select a category</label>
            <select
              {...register("category")}
              id="category"
              className="form-select"
              defaultValue={state.category}
            >
              <option value="programming">Programming</option>
              <option value="AI&ML">AI&ML</option>
              <option value="database">Database</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea
              {...register("content")}
              className="form-control"
              id="content"
              rows="10"
              defaultValue={state.content}
            ></textarea>
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-success">Save</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Article;
