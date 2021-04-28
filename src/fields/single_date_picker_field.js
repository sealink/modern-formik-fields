import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { isFunction } from 'lodash';

export const SingleDatePickerField = ({
  numberOfMonths,
  field,
  form,
  onDateChange,
  displayFormat,
  hideKeyboardShortcutsPanel,
  id,
  disabled,
  renderDayContents,
  isOutsideRange,
  sourceDateFormat,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [date, setDate] = useState();

  useEffect(() => {
    setDate(field.value ? moment(field.value, sourceDateFormat) : null);
  }, [field]);

  return (
    <div className="single-date-picker-field-container">
      <SingleDatePicker
        id={id}
        numberOfMonths={numberOfMonths}
        date={date}
        onDateChange={(option) => {
          form.setFieldValue(field.name, option.format(sourceDateFormat));
          setDate(option);
          if (onDateChange) {
            onDateChange(field.name, option);
          }
        }}
        onFocusChange={(e) => setFocused(e.focused)}
        focused={focused}
        displayFormat={displayFormat}
        hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
        disabled={disabled}
        renderDayContents={(val, options) => {
          if (isFunction(renderDayContents)) {
            return renderDayContents(val);
          }
        }}
        isOutsideRange={isOutsideRange}
        {...props}
      />
    </div>
  );
};

SingleDatePickerField.defaultProps = {
  displayFormat: 'DD-MM-YYYY',
  sourceDateFormat: 'DD-MM-YYYY',
  numberOfMonths: 1,
  field: null,
  form: null,
  onDatesChange: null,
  hideKeyboardShortcutsPanel: false,
  id: null,
  disabled: false,
  renderDayContents: (date) => date.format('D'),
  isOutsideRange: (date) => moment(date).isBefore(),
};

SingleDatePickerField.propTypes = {
  displayFormat: PropTypes.string,
  sourceDateFormat: PropTypes.string,
  numberOfMonths: PropTypes.number,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  onDatesChange: PropTypes.func,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  renderDayContents: PropTypes.func,
  isOutsideRange: PropTypes.func,
};

export default SingleDatePickerField;
