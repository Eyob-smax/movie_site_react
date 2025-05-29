import InfoList from "../InfoList";
const average = (arr) =>
  arr.reduce((acc, cur, index, arr) => acc + cur / arr.length, 0);
import React from "react";
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imbd_rating));
  const avgUserRating = average(watched.map((movie) => movie.user_rating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <InfoList icon={"#️⃣"} info={watched.length} />
        <InfoList icon={"⏳"} info={avgRuntime.toFixed(1)} />
        <InfoList icon={"🌟"} info={avgUserRating.toFixed(1)} />
        <InfoList icon={"⭐️"} info={avgImdbRating.toFixed(1)} />
      </div>
    </div>
  );
}

const WatchedMemo = React.memo(WatchedSummary);
export default WatchedMemo;
