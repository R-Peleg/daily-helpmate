import React, { useState } from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleQuestion
} from '@fortawesome/free-solid-svg-icons'

const HelpButton = () => {
    const [open, setOpen] = useState(false);
    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };
    return <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
            <Tooltip
                PopperProps={{
                    disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="The goal is to make a checkmate to the black in the given number of moves, when black helps white with the task. Drag the pieces to make moves"
            >
                <Button onClick={handleTooltipOpen}>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                </Button>
            </Tooltip>
        </div>
    </ClickAwayListener>
}

export default HelpButton;
