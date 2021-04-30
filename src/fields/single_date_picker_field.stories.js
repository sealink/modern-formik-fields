import React from 'react';
import { SingleDatePickerField } from './index';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import moment from 'moment';

export default {
  title: 'Fields/SingleDatePickerField',
  component: SingleDatePickerField,
  argTypes: {},
  decorators: [],
  parameters: {
    formimk: {
      initialValues: {
        testField: '',
      },
    },
  },
};

const renderDayContents = (dateObject) => {
  const price = Math.floor(Math.random() * 100) + 100;
  return (
    <div>
      <blink>{`${dateObject.format('D')} - $${price}`}</blink>
    </div>
  );
};

const Template = (args) => {
  return (
    <Formik>
      <Form>
        <SingleDatePickerField {...args} />
      </Form>
    </Formik>
  );
};

class exampleForm {
  setFieldValue(fieldName, fieldValue) {}
}

export const Default = Template.bind();

Default.args = {
  field: {
    name: 'testField',
  },
  form: new exampleForm(),
  displayFormat: 'DD-MM-YYYY',
  id: 'default',
};

export const ThreeMonths = Template.bind();

ThreeMonths.args = {
  ...Default.args,
  numberOfMonths: 3,
  id: 'three-months',
};

export const CustomRenderDayContents = Template.bind();

CustomRenderDayContents.args = {
  ...Default.args,
  renderDayContents: renderDayContents,
  id: 'custom-render-contents',
};

export const AllowPastDates = Template.bind();

AllowPastDates.args = {
  ...Default.args,
  isOutsideRange: () => false,
  id: 'allow-past-dates',
};

export const PastDatesWithCustomStartEndYears = Template.bind();

PastDatesWithCustomStartEndYears.args = {
  ...Default.args,
  isOutsideRange: () => false,
  id: 'past-dates-custom-start-end-years',
  startYear: 1900,
  endYear: moment().year(),
};

export const WithoutMonthYearSelects = Template.bind();

WithoutMonthYearSelects.args = {
  ...Default.args,
  id: 'without-month-year-selects',
  renderMonthElement: null,
};
