import './App.css';
import BinaryLoading from "./Component/BinaryLoading";
import {GlobalControllerProvider} from "./GlobalController";
import {Dashboard} from "./Section/SectionLibrary";
import AddCodingQuestion from "./Component/AddCodingQuestion";

function App() {
  return (
    <>
        <GlobalControllerProvider>
            {/*<AddCodingQuestion/>*/}
        <Dashboard/>
        </GlobalControllerProvider>
    </>
  );
}

export default App;
