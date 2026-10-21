import type { ActiveSession, MiseRecipe, RecentRecipe } from "../types";

const DB_NAME = "mise-cocina";
const DB_VERSION = 1;
const STORE = "active-session";
const KEY = "current";
const RECENT_KEY = "recent-recipes";
const MAX_RECENT = 8;

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) {
        request.result.createObjectStore(STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function transact<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE, mode);
    const request = action(transaction.objectStore(STORE));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function loadActiveSession(): Promise<ActiveSession | undefined> {
  return transact<ActiveSession | undefined>("readonly", store => store.get(KEY));
}

export async function saveActiveSession(session: ActiveSession): Promise<void> {
  await transact<IDBValidKey>("readwrite", store => store.put({ ...session, updatedAt: Date.now() }, KEY));
}

export async function clearActiveSession(): Promise<void> {
  await transact<undefined>("readwrite", store => store.delete(KEY));
}

export async function loadRecentRecipes(): Promise<RecentRecipe[]> {
  return (await transact<RecentRecipe[] | undefined>("readonly", store => store.get(RECENT_KEY))) ?? [];
}

export async function rememberRecipe(recipe: MiseRecipe): Promise<RecentRecipe[]> {
  const existing = await loadRecentRecipes();
  const next = [
    { recipe, lastUsedAt: Date.now() },
    ...existing.filter(item => item.recipe.recipeId !== recipe.recipeId)
  ].slice(0, MAX_RECENT);
  await transact<IDBValidKey>("readwrite", store => store.put(next, RECENT_KEY));
  return next;
}
