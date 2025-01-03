import React, { forwardRef } from 'react';
import { Button, Popover, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ResetIcon from '../icons/reset-button.svg'; // Убедитесь, что путь правильный

// Style for reset button (startIcon)
const useStyles = makeStyles({
    startIcon: {
        margin: "0 !important",
        padding: "0 !important",
    },
});

const ResetButton = forwardRef(({ onConfirm, width, height, ...props }, ref) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (e) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };

    const handleClose = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setAnchorEl(null);
    };


    const handleConfirm = (e) => {
        if (e) {
            e.stopPropagation();
        }
        onConfirm();
        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? 'reset-popover' : undefined;
    const classes = useStyles();

    return (
        <>
            <Button
                ref={ref}
                variant="contained"
                onClick={handleClick}
                classes={{startIcon: classes.startIcon}}
                startIcon={<img src={ResetIcon} alt="Reset" height={height} width={width} />}
                sx={{
                    margin: 0,
                    padding: 0,
                    width: `${width}px`,
                    minWidth: 0,
                    marginLeft: "auto",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    '&:hover': {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    }
                }}
                {...props}
            >
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography sx={{ p: 2 }}>Вы уверены, что хотите сбросить параметры?</Typography>
                <Button onClick={handleClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Подтвердить
                </Button>
            </Popover>
        </>
    );
});
export default ResetButton;