import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux"
import DonationCandidates from "./components/DonationCandidates";
import {Container} from "@material-ui/core";

function App() {
  return (
      <Provider store={store}>
          <Container maxWidth="lg">
              <DonationCandidates/>
          </Container>


      </Provider>
  );
}

export default App;
