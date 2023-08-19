/* eslint-disable @next/next/no-img-element */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import Link from "next/link";
const ArticleList = (props) => {
  return (
    <>
      <div className="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-3/12">
        <div
          className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <img src={props.img} className="w-full" alt="Louvre" />
          <Link href={{ pathname: `/news/newsinfo`, query: props }}>
            <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]"></div>
          </Link>
        </div>
      </div>
      {props.favNews.some((e) => {
        return e.title === props.title;
      }) ? null : (
        <div
          style={{ cursor: "pointer" }}
          className="no-underline text-grey-darker hover:text-red-dark"
          onClick={() => {
            props.addToFav(
              props.title,
              props.img,
              props.authorName,
              props.content,
              props.publishedAt,
              props.desc,
              props.url
            );
          }}
        >
          <span className="hidden">Like</span>
          <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
        </div>
      )}
      <div className="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-9/12 xl:w-7/12">
        <div className="mb-3 flex items-center justify-center text-sm font-medium text-danger dark:text-danger-500 md:justify-start"></div>
        <p
          style={{ color: "black" }}
          className="mb-6 text-black-500 dark:text-neutral-300"
        >
          <small>
            Published <u>{new Date(props.publishedAt).toLocaleString()}</u> by
            <a href="#!">{props.authorName}</a>
          </small>
        </p>
        <Link
          href={{ pathname: `/news/newsinfo`, query: props }}
          style={{ color: "black" }}
          className="text-neutral-500 dark:text-neutral-300"
        >
          {props.title}
        </Link>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    favNews: state.favNews,
  };
};

export default connect(mapStateToProps)(ArticleList);
