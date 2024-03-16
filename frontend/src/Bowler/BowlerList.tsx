import { useEffect, useState } from "react";
import { Bowler } from "../types/Bowler";
import { Team } from "../types/Team";

function BowlerList() {
  const [bowlerData, setBowlerData] = useState<Bowler[]>([]);
  const [teamData, setTeamData] = useState<Team[]>([]);
  //get the team name by teamID
  const getTeamName = (teamId: any) => {
    const team = teamData.find((t) => t.teamId === teamId);
    return team ? team.teamName : "Unknown"; //return unknown if cant find a match
  };
  const getCaptainId = (teamId: number) => {
    const team = teamData.find((t) => t.teamId === teamId);
    return team?.captainId;
  };
  useEffect(() => {
    const fetchbowlerData = async () => {
      const rsp = await fetch("http://localhost:5168/BowlingLeague/Bowler");
      const b = await rsp.json();
      setBowlerData(b);
    };
    const fetchteamData = async () => {
      const rspteam = await fetch("http://localhost:5168/BowlingLeague/Team");
      const t = await rspteam.json();
      setTeamData(t);
    };
    fetchbowlerData();
    fetchteamData();
  }, []);

  return (
    <>
      <div>
        <table className="table table-bordered table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Bowler Name</th>
              <th>Team Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {bowlerData.map((b) => (
              <tr key={b.bowlerId}>
                <td
                  className={
                    b.bowlerId === getCaptainId(b.teamId) ? "bold" : ""
                  }
                >
                  {b.bowlerFirstName} {b.bowlerMiddleInit} {b.bowlerLastName}
                </td>
                <td>{getTeamName(b.teamId)}</td>
                <td>{b.bowlerAddress}</td>
                <td>{b.bowlerCity}</td>
                <td>{b.bowlerState}</td>
                <td>{b.bowlerZip}</td>
                <td>{b.bowlerPhoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BowlerList;
