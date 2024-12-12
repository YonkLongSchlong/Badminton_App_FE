import DuoMatch from "./DuoMatch";
import SingleMatch from "./SingleMatch";

export default function MatchCard({ match, id }) {
  if (match.sport_event.sport_event_context.competition.type == "singles") {
    return <SingleMatch match={match} id={id} key={id} />;
  } else {
    return <DuoMatch match={match} id={id} key={id} />;
  }
}
