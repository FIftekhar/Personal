import React from 'react';
import firebase from '../firebase/clientApp';
import { Auth } from 'firebase/auth';

const uiConfig = {
    signInSuccessUrl: "/",
    signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID]
}