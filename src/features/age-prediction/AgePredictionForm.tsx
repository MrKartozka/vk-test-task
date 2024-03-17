import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@vkontakte/vkui";
import Input from "./importVk";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { predictAge } from "../../shared/api/predictAge";

type FormData = {
    name: string;
};

const schema = yup
    .object({
        name: yup
            .string()
            .required()
            .matches(/^[A-Za-zА-Яа-яёЁ]+$/),
    })
    .required();

const AgePredictionForm: React.FC = () => {
    const [predictedAge, setPredictedAge] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [lastQueriedName, setLastQueriedName] = useState<string>("");
    const [notification, setNotification] = useState<string>("");
    const [abortController, setAbortController] = useState(
        new AbortController()
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    function getAgeWord(age: number): string {
        const lastDigit = age % 10;
        const secondLastDigit = Math.floor((age % 100) / 10);

        if (secondLastDigit === 1) {
            return "лет";
        }

        switch (lastDigit) {
            case 1:
                return "год";
            case 2:
            case 3:
            case 4:
                return "года";
            default:
                return "лет";
        }
    }

    const onSubmit: SubmitHandler<FormData> = async ({ name }) => {
        if (name.toLowerCase() === lastQueriedName.toLowerCase()) {
            setNotification(
                "Вы уже искали этого имени. Пожалуйста, введите другое имя."
            );
            return;
        }

        if (isLoading) {
            abortController.abort();
            setAbortController(new AbortController());
        }
        setNotification("");
        setIsLoading(true);

        try {
            const age = await predictAge(name, abortController.signal);
            if (age !== null) {
                setPredictedAge(age);
                setNotification(
                    `Предсказанный возраст для имени ${name}: ${age} ${getAgeWord(
                        age
                    )}.`
                );
                setLastQueriedName(name.toLowerCase());
            } else {
                setNotification("Не удалось получить возраст.");
            }
        } catch (error) {
            const e = error as Error;
            if (e.name !== "AbortError") {
                setNotification("Произошла ошибка при предсказании возраста.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                type="text"
                placeholder="Введите свое имя"
                {...register("name")}
                status={errors.name ? "error" : "default"}
                bottom={errors.name ? errors.name.message : ""}
            />
            <Button type="submit">Предсказать года</Button>
            {isLoading && <p>Загрузка...</p>}
            {notification && <div className="notification">{notification}</div>}
        </form>
    );
};

export default AgePredictionForm;
