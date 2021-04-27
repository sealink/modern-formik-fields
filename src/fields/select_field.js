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
  optionValue,
  optionLabel,
  ...props
}) => {
  return (
    <div className="select-field-container">
      <Select
        options={options}
        onChange={(option) => {
          const selectedValue = isMulti
            ? option?.map((item) => item[optionValue])
            : option[optionValue];
          form.setFieldValue(field.name, selectedValue);
          if (onChange) {
            onChange(option);
          }
        }}
        onBlur={field.onBlur}
        isMulti={isMulti || false}
        className={className || 'select-field'}
        closeMenuOnSelect={props.closeMenuOnSelect || !isMulti}
        isDisabled={isDisabled}
        inputId={id}
        optionValue={optionValue}
        optionLabel={optionLabel}
        getOptionValue={(option) => option[optionValue]}
        getOptionLabel={(option) => option[optionLabel]}
        {...props}
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
  optionValue: 'value',
  optionLabel: 'label',
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
  optionValue: PropTypes.string,
  optionLabel: PropTypes.string,
};

export default SelectField;
