# 🎬 Movie App – usePopcorn 🍿

A responsive React-based movie discovery and watchlist app using The Movie Database (TMDb) API. Users can search movies, view details including genres, ratings, and overviews, and maintain a personal list of watched movies with custom ratings.

## 🔍 Features
- **🔎 Search Movies** – Search for movies using TMDb's search endpoint
- **🎥 Movie Details** – View title, genres, release date, overview, and IMDb rating
- **⭐ User Ratings** – Rate a movie before adding it to your watched list
- **📝 Watched List** – Save rated movies and see your personal watched history
- **⏳ Debounced Search** – Efficient API usage with delayed querying
- **⚡ Error Handling** – Alerts for API timeouts and no search results
- **📱 Responsive UI** – Clean layout built with reusable components

## 🛠️ Technologies Used
- **React** (Hooks, State, Effect)
- **JavaScript** (ES6+)
- **TMDb API** for movie data


### 📥 Installation
```bash
# 1. Clone the repository
git clone https://github.com/your-username/usePopcorn.git
cd usePopcorn

# 2. Install dependencies
npm install

# 3. Set up environment variables
echo "REACT_APP_TMDB_API_KEY=your_api_key_here" > .env

# 4. Start the development server
npm start
