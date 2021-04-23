import React, { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

export const SelectField = ({
  options,
  field,
  form,
  isMulti,
  onChange,
  className,
  id,
  isDisabled,
}) => {
  const [selectedValue, setSelectedValue] = useState();
  function selectedValueFromOptions(selected) {
    if (isMulti) {
      return (
        options.filter((option) => field.value?.includes(option.value)) || []
      );
    } else {
      return options.find((option) => option.value === field.value) || '';
    }
  }

  return (
    <div className="select-field-container">
      <Select
        options={options}
        value={selectedValue}
        onChange={(option) => {
          const selectedValue = isMulti
            ? option?.map((item) => item.value)
            : option.value;
          form.setFieldValue(field.name, selectedValue);
          setSelectedValue(selectedValueFromOptions(option));
          if (onChange) {
            onChange(option);
          }
        }}
        onBlur={field.onBlur}
        isMulti={isMulti || false}
        className={className || 'select-field'}
        closeMenuOnSelect={!isMulti}
        isDisabled={isDisabled}
        inputId={id}
      />
    </div>
  );
};

SelectField.defaultProps = {
  options: [],
  field: null,
  form: null,
  isMulti: false,
  onChange: null,
  className: null,
  id: null,
  isDisabled: false,
};

SelectField.propTypes = {
  options: PropTypes.array.isRequired,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default SelectField;
