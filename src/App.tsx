import React from "react";
import AgePredictionForm from "./features/age-prediction/AgePredictionForm";
import "@vkontakte/vkui/dist/vkui.css";
import FactFetcher from "./features/fact-fetcher/FactFetcher";
import "./App.css";

const App: React.FC = () => {
    return (
        <div className="App">
            <FactFetcher />
            <AgePredictionForm />
        </div>
    );
};

export default App;
