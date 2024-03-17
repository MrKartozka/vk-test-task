export const predictAge = async (
    name: string,
    signal: AbortSignal
): Promise<number | null> => {
    try {
        const response = await fetch(`https://api.agify.io?name=${name}`, {
            signal,
        });
        const data = await response.json();
        return data.age;
    } catch (error) {
        const e = error as Error;
        if (e.name === "AbortError") {
            console.log("Fetch aborted");
        } else {
            console.error("Error fetching the predicted age:", e);
        }
        return null;
    }
};
