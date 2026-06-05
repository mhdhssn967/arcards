import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlvCd7GblYcJAVKTWjMyM8Wwk1ehCQC4A",
  authDomain: "ar-flash-cards.firebaseapp.com",
  projectId: "ar-flash-cards",
  storageBucket: "ar-flash-cards.firebasestorage.app",
  messagingSenderId: "844789383381",
  appId: "1:844789383381:web:193a730fe12d94cfbf625c",
  measurementId: "G-Z5SEGG74CC",
};

function getDb() {
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return getFirestore(app);
}

const VISITED_KEY = "oqulix_visited";
const VISITOR_DOC = "analytics/visitors";
const CLICKS_DOC  = "analytics/clicks";

/**
 * Call once on page load.
 * - Always increments totalVisits.
 * - Increments uniqueVisits only on the very first visit (per browser).
 */
export async function trackPageVisit() {
  try {
    const db = getDb();
    const ref = doc(db, "analytics", "visitors");
    const isUnique = !localStorage.getItem(VISITED_KEY);

    // Use setDoc with merge so the document is created if it doesn't exist yet
    await setDoc(
      ref,
      {
        totalVisits: increment(1),
        ...(isUnique ? { uniqueVisits: increment(1) } : {}),
        lastVisit: serverTimestamp(),
      },
      { merge: true }
    );

    if (isUnique) {
      localStorage.setItem(VISITED_KEY, "1");
    }
  } catch (e) {
    // Silently fail — never break the UI for analytics
    console.warn("[Analytics] trackPageVisit failed:", e);
  }
}

/**
 * Call on any button/link click you want to track.
 * @param {"install_app"|"try_demo"|"buy_cards"|"download_app"|"buy_now_cta"} eventName
 */
export async function trackClick(eventName) {
  try {
    const db = getDb();
    const ref = doc(db, "analytics", "clicks");
    await setDoc(
      ref,
      { [eventName]: increment(1), lastClick: serverTimestamp() },
      { merge: true }
    );
  } catch (e) {
    console.warn("[Analytics] trackClick failed:", e);
  }
}
