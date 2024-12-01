import Snackbar from '@mui/material/Snackbar';
import PropTypes from 'prop-types';

function SnackBar({
    isOpen,
    autoHideDuration = "6000",
    onClose,
    message,
    action,
    bgc
}) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        onClose(event, reason);
    };

    return (
        <div className='snackbar'>
            <Snackbar
                open={isOpen}
                autoHideDuration={autoHideDuration}
                onClose={handleClose}
                message={message}
                action={action}
                sx={{
                    "& .MuiSnackbarContent-root": {
                        backgroundColor: "#4caf50",
                        color: bgc || "#fff",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                }}
            />
        </div>
    );
}

SnackBar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    autoHideDuration: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    action: PropTypes.node,
    bgc: PropTypes.string,
};

export default SnackBar;