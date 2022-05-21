import { Popover } from "@mui/material";
import { NameInputField } from "./NameInputField";

interface RenamePopperProps {
    anchorEl: Element | null;
    defaultValue: string;
    onEnter: (value: string) => boolean;
    onClose: () => void;
    validator: (value: string) => boolean;
}

export const RenamePopper = ({ anchorEl, onEnter, onClose, validator, defaultValue }: RenamePopperProps) => {
    return (
        <Popover
            id="change-field-name-popover"
            open={true}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
            transformOrigin={{ vertical: 'top', horizontal: 'center', }}
        >
            <NameInputField
                helperText="Введите новое название"
                defaultValue={defaultValue}
                onEnter={onEnter}
                validator={validator}
            />
        </Popover>
    );
};
