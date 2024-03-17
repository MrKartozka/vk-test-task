import React, { forwardRef } from "react";
import { Input as VKInput, InputProps as VKInputProps } from "@vkontakte/vkui";

interface InputProps extends VKInputProps {
    bottom?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ bottom, ...props }, ref) => {
        return (
            <div>
                <VKInput getRef={ref} {...props} />
                {bottom && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                        {bottom}
                    </div>
                )}
            </div>
        );
    }
);

export default Input;
