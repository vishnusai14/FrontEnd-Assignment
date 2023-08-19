import { useEffect } from "react";
import { firebaseApp } from "../../services/firebase";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as actionTypes from "../../store/creators/creators";
import Head from "next/head";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import Article from "../../components/Article";
import ArticleList from "../../components/ArticleList";

import { DATABASE_URL } from "../../env";

import axios from "axios";

const News = (props) => {
  const router = useRouter();
  const auth = getAuth(firebaseApp);
  const handleLogout = () => {
    setLoading(true);
    signOut(auth)
      .then((res) => {
        setLoading(false);
        props.logout();
        router.push("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showingFav, setShowingFav] = useState(false);

  const changeView = (view) => {
    if (!view) {
      props.changeView("list");
    } else {
      props.changeView("grid");
    }
  };
  const changePage = (where) => {
    console.log("Where");
    if (where === "Prev") {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else {
      console.log(props.totalPage);
      if (page * 20 < props.totalPage) {
        setPage(page + 1);
      }
    }
  };
  useEffect(() => {
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&page=${page}&apiKey=6e731371b6f54fd480240031907b517e`;
    axios
      .get(url)
      .then((data) => {
        let news = [];
        console.log(data.data);
        data.data.articles.forEach((i) => {
          news.push({
            title: i.title,
            desc: i.description,
            url: i.url,
            img: i.urlToImage,
            publishedAt: i.publishedAt,
            content: i.content,
            authorName: i.source.name,
          });
        });
        props.setNews(news);
        props.total(data.data.totalResults);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [page]);
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        axios
          .get(`${DATABASE_URL}/users/${user.uid}.json`)
          .then((data) => {
            let news = data.data;
            let favNews = [];
            Object.keys(news).forEach((i) => {
              favNews.push(news[i]);
            });
            props.setFavNews(favNews);
          })
          .catch((err) => {
            console.log(err);
            props.setFavNews([]);
          });
        props.login(user.email, user.uid);
        setLoading(false);
      } else {
        setLoading(false);
        router.push("/");
      }
    });
  }, [auth, router]);

  const addToFav = (
    title,
    img,
    authorName,
    content,
    publishedAt,
    desc,
    urlTo
  ) => {
    console.log("Adding To Fav");
    props.setFavNews([
      ...props.favNews,
      { title, img, authorName, content, publishedAt, desc, url: urlTo },
    ]);
    let url = `${DATABASE_URL}/users/${props.uid}.json`;
    console.log(url);
    axios
      .post(url, {
        title,
        img,
        authorName,
        content,
        publishedAt,
        desc,
        url: urlTo,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleFav = () => {
    setShowingFav(!showingFav);
  };

  let newsToDisplay = showingFav ? props.favNews : props.news;

  return loading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>News - Read And Learn</title>
      </Head>
      <>
        <Header
          showingFav={showingFav}
          changeView={changeView}
          changePage={changePage}
          handleLogout={handleLogout}
          toggleFav={toggleFav}
        />
        {props.view === "grid" ? (
          <>
            <div
              style={{ marginTop: "100px" }}
              className="container my-12 mx-auto px-4 md:px-12"
            >
              <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {newsToDisplay.map((e) => {
                  return (
                    <Article
                      addToFav={addToFav}
                      title={e.title}
                      img={e.img}
                      desc={e.desc}
                      url={e.url}
                      publishedAt={e.publishedAt}
                      content={e.content}
                      authorName={e.authorName}
                      key={Math.random()}
                    />
                  );
                })}
              </div>{" "}
            </div>
          </>
        ) : (
          <div style={{ marginTop: "140px" }} className="mb-6 flex flex-wrap">
            {newsToDisplay.map((e) => {
              return (
                <ArticleList
                  addToFav={addToFav}
                  title={e.title}
                  img={e.img}
                  desc={e.desc}
                  url={e.url}
                  publishedAt={e.publishedAt}
                  content={e.content}
                  authorName={e.authorName}
                  key={Math.random()}
                />
              );
            })}{" "}
          </div>
        )}
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.email,
    uid: state.uid,
    news: state.news,
    totalPage: state.total,
    view: state.view,
    favNews: state.favNews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, uid) => {
      dispatch(actionTypes.login(email, uid));
    },
    logout: () => {
      dispatch(actionTypes.logout());
    },
    setNews: (news) => {
      dispatch(actionTypes.setNews(news));
    },
    total: (total) => {
      dispatch(actionTypes.total(total));
    },
    changeView: (view) => {
      dispatch(actionTypes.changeView(view));
    },
    setFavNews: (favNews) => {
      dispatch(actionTypes.setFavNews(favNews));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
