import { useState } from "react";

export function useIncrement(inicial) {
    const [value, setValue] = useState(inicial);

    const onChange = (value) => {
        setValue(value);
    }

    return {
        value,
        onChange
    }
}