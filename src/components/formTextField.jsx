import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const FormTextField = ({ id, name, label, type, required = true }) => (
    <TextField
        autoFocus
        required={required}
        margin="dense"
        id={id}
        name={name}
        label={label}
        type={type}
        fullWidth
        variant="standard"
    />
);

FormTextField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

export default FormTextField;