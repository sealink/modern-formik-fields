import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import { isFunction } from 'lodash';

export const MultiDatePickerField = ({
  numberOfMonths,
  field,
  form,
  onDatesChange,
  displayFormat,
  hideKeyboardShortcutsPanel,
  id,
  startDateId,
  endDateId,
  disabled,
  isOutsideRange,
  sourceDateFormat,
  ...props
}) => {
  const [focused, setFocused] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    setStartDate(
      field.value?.startDate
        ? moment(field.value.startDate, sourceDateFormat)
        : null
    );
    setEndDate(
      field.value?.endDate
        ? moment(field.value.endDate, sourceDateFormat)
        : null
    );
  }, [field]);

  return (
    <div className="multi-date-picker-field-container">
      <DateRangePicker
        id={id}
        focusedInput={focused}
        onFocusChange={(focusedInput) => {
          setFocused(focusedInput);
        }}
        onDatesChange={(dates) => {
          setStartDate(dates.startDate);
          setEndDate(dates.endDate);
          form.setFieldValue(field.name, {
            startDate: dates.startDate?.format(sourceDateFormat),
            endDate: dates.endDate?.format(sourceDateFormat),
          });
          {
            if (isFunction(onDatesChange)) {
              onDatesChange(dates);
            }
          }
        }}
        startDateId={startDateId || `${id}-start-date`}
        startDate={startDate}
        endDateId={endDateId || `${id}-end-date`}
        endDate={endDate}
        enableOutsideDays={true}
        displayFormat={displayFormat}
        isOutsideRange={isOutsideRange}
        disabled={disabled}
        hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
        numberOfMonths={numberOfMonths}
        {...props}
      />
    </div>
  );
};

MultiDatePickerField.defaultProps = {
  displayFormat: 'DD-MM-YYYY',
  sourceDateFormat: 'DD-MM-YYYY',
  numberOfMonths: 1,
  field: null,
  form: null,
  onDatesChange: null,
  hideKeyboardShortcutsPanel: false,
  id: null,
  disabled: false,
  isOutsideRange: (date) => moment(date).isBefore(),
};

MultiDatePickerField.propTypes = {
  displayFormat: PropTypes.string,
  sourceDateFormat: PropTypes.string,
  numberOfMonths: PropTypes.number,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  onDatesChange: PropTypes.func,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  id: PropTypes.string.isRequired,
  startDateId: PropTypes.string,
  endDateId: PropTypes.string,
  disabled: PropTypes.bool,
  isOutsideRange: PropTypes.func,
};

export default MultiDatePickerField;
