import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
const Article = (props) => {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="overflow-hidden rounded-lg shadow-lg">
        <Link href={{ pathname: `/news/newsinfo`, query: props }}>
          <img
            alt="Placeholder"
            className="block h-auto w-full"
            src={props.img}
          />
        </Link>

        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg">
            <Link
              className="no-underline hover:underline text-black"
              href={{ pathname: `/news/newsinfo`, query: props }}
            >
              {props.title}
            </Link>
          </h1>
          <p className="text-grey-darker text-sm">
            {new Date(props.publishedAt).toLocaleString()}
          </p>
        </header>

        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
          <a
            className="flex items-center no-underline hover:underline text-black"
            href="#"
          >
            <img
              alt="Placeholder"
              className="block rounded-full"
              src="https://picsum.photos/32/32/?random"
            />
            <p className="ml-2 text-sm">{props.authorName}</p>
          </a>
          {props.favNews.some((e) => {
            return e.title === props.title;
          }) ? null : (
            <div
              style={{ cursor: "pointer" }}
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
              className="no-underline text-grey-darker hover:text-red-dark"
              href="#"
            >
              <span className="hidden">Like</span>
              <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
            </div>
          )}
        </footer>
      </article>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    favNews: state.favNews,
  };
};

export default connect(mapStateToProps)(Article);
