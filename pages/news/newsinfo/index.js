/* eslint-disable @next/next/no-img-element */

"use client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const Page = (props) => {
  const router = useRouter();

  const news = router.query;
  console.log(router.query);
  return (
    <>
      <Head>
        <title>{news.title}</title>
      </Head>
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mt-4 text-gray-500">{news.content}</p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Published At</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {new Date(news.publishedAt).toLocaleString()}
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Author</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {news.authorName}
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Description</dt>
                <dd className="mt-2 text-sm text-gray-500">{news.desc}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">URL</dt>
                <Link
                  target="_blank"
                  href={news.url ? news.url : " "}
                  className="mt-2 text-sm text-gray-500"
                >
                  Read More
                </Link>
              </div>
            </dl>
          </div>
          <div className="grid">
            <img
              src={news.img}
              alt="Image"
              className="rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    news: state.news,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
