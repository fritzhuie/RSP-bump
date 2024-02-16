import styles from "./MatchHistory.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMatchHistory } from "../../services/matchHistoryServices";
import { getProfile, getProfiles } from "../../services/profileServices";

const History = () => {
  const [matchHistory, setMatchHistory] = useState([]);
  const [profiles, setProfiles] = useState();
  const [nameList, setNameList] = useState(null)
  const navigate = useNavigate();
  let userid = null

  useEffect(() => {
    getProfile()
    .then(profile => {
      console.log(profile[0])
      userid = profile[0].user
    })
    .then( profile => {
    getMatchHistory()
      .then((history) => {
        console.log(history); // array of matches
        let user_matches = []
        let user_ids = new Set();
        for (let match of history) {
          user_ids.add(match.player_one);
          user_ids.add(match.player_two);
          if (match.player_one === userid || match.player_two === userid){
            user_matches.push(match)
            console.log(`Match: ${match.player_one}, ${match.player_two} ? ${userid}`)
          }else{
            console.log(`Not match: ${match.player_one}, ${match.player_two} ? ${userid}`)
          }
          setMatchHistory(user_matches)
        }
        return Array.from(user_ids);
      })
      .then((user_ids) => {
        return getProfiles(user_ids);
      })
      .then((profiles) => {
        console.log("PROFILES: ", profiles);
        let names = {}
        for (let index in profiles) {
            console.log(" profile:", profiles[index])
            names[profiles[index].user] = profiles[index].name
        }
        console.log("NAMES: ", names)
        setNameList(names)
        setProfiles(profiles);
      })
      .catch((error) => {
        console.error("Failed to fetch match history:", error);
      })})
  }, []);

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  const handleMatchClick = (resultId) => {
    navigate(`/game/result/${resultId}`);
  };

  return (
    <div className={styles.matchResultContainer}>
      <div className={styles.closeButtonContainer}>
      <button className={styles.closeButton} onClick={handleGoToProfile}>X</button>
      </div>
      <div className={styles.matchResultHeader}>
        <h1 className={styles.title}>Match History</h1>
      </div>
      <ul className={styles.matchContainer}>
        {matchHistory.map((match) => (
          <li
            key={match.id}
            className={styles.matchRowItem}
            onClick={() => handleMatchClick(match.id)}
          >
            <div className={styles.userAvatar}></div>
            <div className={styles.imageContainer}>
            <img
              className={styles.imageComp}
              src={`/img/portrait-${match.player_one % 17}.png`}
              alt="Player 1 Avatar"
            />
            </div>
            <p className={styles.playerInfo} >
            {nameList ? nameList[match.player_one] : "name"}
            </p>
            <p className={styles.vsTag}>VS.</p>
            <div className={styles.opponentAvatar}></div>
            <p className={styles.playerInfo} >
              {nameList ? nameList[match.player_two] : "name"}
            </p>
            <div style={{backgroundColor: '#0A0A2F'}} className={styles.imageContainer}>
            <img
              className={styles.imageComp}
              src={`/img/portrait-${match.player_two % 17}.png`}
              alt="Player 2 Avatar"
            />
            </div>
            {/* <div className={styles.matchDetails}>
          <p>Match ID: {match.id}</p>
          <p>{match.time_stamp}</p>
        </div> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
