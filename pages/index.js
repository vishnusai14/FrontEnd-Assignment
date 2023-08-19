/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Registration from "../components/Registration";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp } from "../services/firebase";
import { connect } from "react-redux";
import * as actionTypes from "../store/creators/creators";
import Loader from "../components/Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import { getDatabase, ref, set } from "firebase/database";
import axios from "axios";
import { DATABASE_URL } from "../env";

const Home = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth(firebaseApp);
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        props.login(user.email, user.uid);
        router.push("/news");
      } else {
        setLoading(false);
      }
    });
  }, [auth, props, router]);

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        //Update The State with the current User
        const db = getDatabase();
        console.log(db);

        // set(ref(db, userCredentials.user.uid), {
        //   fav: [],
        // })
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.log("Ser Error");
        //     console.log(err);
        //   });

        props.login(userCredentials.user.email, userCredentials.user.uid);
        router.push("/news");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false);
        if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
              //Update The State with the Current User

              axios
                .get(`${DATABASE_URL}/users/${userCredentials.user.uid}.json`)
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
              props.login(userCredentials.user.email, userCredentials.user.uid);

              router.push("/news");
              setLoading(false);
              s;
            })
            .catch((err) => {
              setLoading(false);
              if (err.code === AuthErrorCodes.INVALID_PASSWORD) {
                setErr("Invalid UserName or Password");
              }
            });
        } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
          setLoading(false);
          setErr("Weak Password");
        } else {
          setLoading(false);
          setErr("Server Error");
        }
      });
  };
  return loading ? (
    <>
      <Head>
        <title>Hang On .....</title>
      </Head>
      <Loader />
    </>
  ) : (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <Registration
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
        login={true}
        err={err}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.email,
    uid: state.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, uid) => {
      dispatch(actionTypes.login(email, uid));
    },
    setFavNews: (favNews) => {
      dispatch(actionTypes.setFavNews(favNews));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
