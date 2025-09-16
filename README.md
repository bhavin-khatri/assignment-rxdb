# RxDB Offline-First App

This project is a **React Native offline-first CRUD application** using **RxDB** with **SQLite storage**. It supports syncing with CouchDB for cloud backup and collaboration, while ensuring offline functionality when the device is not connected.

---

## 🚀 How to Run the Project

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Pods (iOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run on device/emulator**
   ```bash
   npm run android
   # or
   npm run ios
   ```

---

## 🔄 CouchDB Sync Configuration

This app uses **CouchDB replication** to sync local RxDB collections with a remote CouchDB server.

- **Setup CouchDB**:
  1. Install CouchDB locally or use a hosted instance.
  2. Create a database (e.g., `rxdb_demo`).
  3. Ensure CORS is enabled for mobile app requests.
     ```bash
     couchdb-enable-cors
     ```

- **Replication in code**:
  ```ts
  const replicationState = myCollection.syncCouchDB({
    remote: 'http://<username>:<password>@<couchdb-host>:5984/rxdb_demo',
    options: {
      live: true,   // keep syncing in real-time
      retry: true   // retry if connection fails
    }
  });
  ```

- **Behavior**:
  - **Local → Remote:** Any changes in the RxDB collections are replicated to CouchDB.
  - **Remote → Local:** Changes from CouchDB are automatically pulled into the app.
  - Conflicts are handled by RxDB’s conflict resolution strategies.

---

## 📴 Offline Functionality

This project is designed with **offline-first architecture**:

- **Local Storage:**  
  Data is stored in SQLite using RxDB, so the app works without internet.

- **CRUD Operations:**  
  Users can **create, read, update, delete** records while offline. Changes are stored locally.

- **Sync on Reconnect:**  
  Once internet connectivity is restored:
  - Pending changes are synced to CouchDB.
  - Updates from CouchDB are pulled into the local database.
  - Conflicts (if any) are resolved using RxDB’s built-in mechanisms.

- **Guaranteed Access:**  
  Since all queries and mutations run against the local RxDB instance, the app remains usable even in airplane mode.

---

## 🛠️ Tech Stack

- **React Native** (frontend framework)
- **RxDB** (offline-first database)
- **SQLite** (local storage via QuickSQLite)
- **CouchDB** (remote sync server)
