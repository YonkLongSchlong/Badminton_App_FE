import DuoMatch from "./DuoMatch";
import SingleMatch from "./SingleMatch";
import { LogBox } from "react-native";

LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop']);
export default function MatchCard({ match, id }) {
  if (match.sport_event.sport_event_context.competition.type == "singles") {
    return <SingleMatch match={match} id={id} key={id} />;
  } else {
    return <DuoMatch match={match} id={id} key={id} />;
  }
}
