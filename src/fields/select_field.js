import React from 'react';
import Select from 'react-select';

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
  function selectedValue() {
    if (options) {
      if (isMulti) {
        return (
          options.filter((option) => field.value?.includes(option.value)) || []
        );
      } else {
        return options.find((option) => option.value === field.value) || '';
      }
    } else {
      return '';
    }
  }

  return (
    <div className="select-field-container">
      <Select
        options={options}
        value={selectedValue()}
        onChange={(option) => {
          console.log(form, field);
          form.setFieldValue(
            field.name,
            isMulti ? option?.map((item) => item.value) : option.value
          );
          if (onChange) {
            onChange(option);
          }
        }}
        onBlur={field.onBlur}
        isMulti={isMulti || false}
        className={className || 'select-field'}
        closeMenuOnSelect={!isMulti}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default SelectField;
