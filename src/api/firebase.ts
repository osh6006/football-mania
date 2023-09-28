import { initializeApp } from "firebase/app";
import { User } from "@firebase/auth";
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import { initLeague } from "../util/league";
import { DBLeague } from "../type/dbleague";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_API_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_API_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_API_PROJECT_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth();
const database = getDatabase();

export async function googleLogin() {
  return signInWithPopup(auth, googleProvider)
    .then((result) => {
      return result.user;
    })
    .catch(console.error);
}

export async function githubLogin() {
  return signInWithPopup(auth, githubProvider)
    .then((result) => {
      console.log(result.user);

      return result.user;
    })
    .catch(console.error);
}

export async function firebaseLogout() {
  return signOut(auth)
    .then(() => null)
    .catch(console.error);
}

// 유저의 상태를 체크 (로그인 로그아웃)
export function onUserStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

// 유저가 선택한 리그가 없으면 초기화 시킨다.
export async function initSelectLeague(user: User | null) {
  const selectLeague = await getUserSelectLeague(user?.uid);

  // 유저가 선택한 리그가 없으면 초기화
  if (!selectLeague) {
    await initUserSelectLeague(user?.uid);
  }
}

// 유저가 선택할 수 있는 리그를 가져온다.
export async function getLeagueList() {
  return get(ref(database, "footballMania/league")).then((snapshot) => {
    if (snapshot.exists()) {
      const leagues = snapshot.val();
      return leagues;
    }
  });
}

// 유저의 리그를 초기화 한다.
async function initUserSelectLeague(userId?: string) {
  if (userId) {
    set(ref(database, `footballMania/users/${userId}/league`), initLeague);
  }
}

// 유저가 선택한 리그를 가져온다.
export async function getUserSelectLeague(userId?: string) {
  if (userId) {
    return await get(
      ref(database, `footballMania/users/${userId}/league`)
    ).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    });
  }

  return null;
}

// 유저가 선택한 리그들을 저장한다.
export async function writeSelectLeagueList(
  leagueList: DBLeague[] | null,
  userId?: string
) {
  if (leagueList && leagueList.length > 0 && userId) {
    set(ref(database, `footballMania/users/${userId}/league`), leagueList);
  }
}
