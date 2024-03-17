import React, { useRef, useState } from "react";
import { Button } from "@vkontakte/vkui";
import { fetchCatFact } from "./../../shared/api/fetchCatFact";
import Input from "../age-prediction/importVk";

const FactFetcher: React.FC = () => {
    const [fact, setFact] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFetchFact = async () => {
        try {
            const newFact = await fetchCatFact();
            setFact(newFact);
            const firstSpaceIndex = newFact.indexOf(" ");
            if (inputRef.current && firstSpaceIndex > -1) {
                inputRef.current.setSelectionRange(
                    firstSpaceIndex + 1,
                    firstSpaceIndex + 1
                );
            }
        } catch (error) {
            console.error("Error fetching fact:", error);
        }
    };

    return (
        <div>
            <Button onClick={handleFetchFact}>Получить Факт</Button>
            <Input type="text" value={fact} readOnly ref={inputRef} />
        </div>
    );
};

export default FactFetcher;
