// Demo user + two notes, mirroring the original Postgres seed. Run with: npm run seed
// Reads the same Firebase env vars as the app (loaded via --env-file).
import { adminAuth, adminDb, serverTimestamp } from "../lib/firebase";

async function main() {
  const email = "demo@noteflow.app";
  const password = "Password123!";
  const name = "Demo User";

  let uid: string;
  const existing = await adminAuth.getUserByEmail(email).catch(() => null);
  if (existing) {
    uid = existing.uid;
    await adminAuth.updateUser(uid, { password, displayName: name });
  } else {
    const user = await adminAuth.createUser({ email, password, displayName: name });
    uid = user.uid;
  }

  await adminDb.collection("users").doc(uid).set(
    { name, email, createdAt: serverTimestamp() },
    { merge: true },
  );

  const previous = await adminDb.collection("notes").where("userId", "==", uid).get();
  await Promise.all(previous.docs.map((doc) => doc.ref.delete()));

  const batch = adminDb.batch();
  batch.set(adminDb.collection("notes").doc(), {
    userId: uid,
    title: "Project requirements",
    content: "Auth, CRUD, search, pinning.",
    isPinned: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  batch.set(adminDb.collection("notes").doc(), {
    userId: uid,
    title: "React hooks",
    content: "useState, useEffect, useOptimistic.",
    isPinned: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await batch.commit();

  console.log(`Seeded demo user ${uid} (${email}) with 2 notes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});