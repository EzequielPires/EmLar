import { useState } from "react";

type Select = {
    value: number | string | null | boolean;
    options: Array<any>;
    setValue: any;
    setOptions: any;
    onChange: (v:any) => void;
}

export function useSelect():Select {
    const [value, setValue] = useState(null);
    const [options, setOptions] = useState([]);

    return {
        value,
        options,
        setValue,
        setOptions,
        onChange: (v:any) => setValue(v)
    }
}