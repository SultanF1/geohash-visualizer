import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Popover from 'react-tiny-popover';
import * as Utils from './utils';

interface ControlPanelProps {
    geohash: string;
    pageUrl?: string;
    onGeohashChanged?: (geohash: string) => void;
    onGeohashSubmitted?: (geohash: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ geohash, onGeohashChanged, onGeohashSubmitted }) => {
    const [inputValue, setInputValue] = useState(geohash);
    const inputRef = useRef<HTMLInputElement>(null);
    // Use React Router hooks as needed
    // const navigate = useNavigate();
    // const params = useParams();

    useEffect(() => {
        inputRef.current?.focus();
    }, [inputValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newGeohash = event.target.value;
        setInputValue(newGeohash);
        onGeohashChanged?.(newGeohash);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onGeohashSubmitted?.(inputValue);
    };

    const geohashValidationResults = Utils.validateGeohash(inputValue.toLowerCase());

    let inputFieldClassName = 'geohash-search__input';
    let errorPopupClassName = 'geohash-search__error-message';
    let errorPopupText = '';

    if (geohashValidationResults.status === 'error') {
        inputFieldClassName += ' geohash-search__input--error';
        errorPopupText = `The character '${inputValue[geohashValidationResults.index]}' not belongs to geohash`;
    }

    return (
        <form className="geohash-search" onSubmit={handleSubmit}>
                <input
                    className={inputFieldClassName}
                    ref={inputRef}
                    type="text"
                    autoFocus
                    spellCheck={false}
                    placeholder=""
                    onChange={handleInputChange}
                    value={inputValue}
                />
                <input type="submit" className="geohash-search__go-button" value="Go" />
        </form>
    );
};

export default ControlPanel;
