import { useState, useEffect } from 'react';
import { axiosWithToken } from '../../axiosWithToken';
import { useNavigate, Outlet } from 'react-router-dom';


function Articles() {
  const [articlesList, setArticlesList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getArticlesOfCurrentAuthor = async () => {
    try {
      const res = await axiosWithToken.get(`http://localhost:4000/user-api/articles`);
      setArticlesList(res.data.payload);
    } catch (err) {
      setError("Failed to fetch articles. Please try again later.");
      console.error(err);
    }
  };

  const readArticleByArticleId = (articleObj) => {
    navigate(`../article/${articleObj.articleId}`, { state: articleObj });
  };

  useEffect(() => {
    getArticlesOfCurrentAuthor();
  }, []);

  return (
    <div className="articles-container">
      {error && <p className="error-message">{error}</p>}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
        {articlesList.map((article) => (
          <div className="col" key={article.articleId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {article.content.substring(0, 80) + "...."}
                </p>
                <button className="custom-btn btn-4" onClick={() => readArticleByArticleId(article)}>
                  <span>Read More</span>
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Last updated on {new Date(article.dateOfModification).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default Articles;
