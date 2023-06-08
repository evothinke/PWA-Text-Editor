import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic to a method that accepts some content and adds it to the database
export const putDb = async (eContent) => {
  const db= await openDB('jate',1);
  const trans= db.transaction('jate','readwrite');
  const store= trans.objectStore('jate');
  const request= store.put({id: 1 , eContent});
  const response= await request;
  (console.log("Content added sucessfully. \n", response.value));
};

// logic for a method that gets all the content from the database
export const getDb = async () => {
  const db= await openDB('jate',1);
  const trans= db.transaction('jate','readonly');
  const store= trans.objectStore('jate');
  const request= store.getAll();
  const response = await request;
  return response.value;
};

initdb();