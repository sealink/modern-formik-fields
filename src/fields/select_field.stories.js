import React from 'react';
import { SelectField } from './index';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';

export default {
  title: 'Fields/SelectField',
  component: SelectField,
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

const options = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
  { value: 4, label: 'Option 4' },
  { value: 5, label: 'Option 5' },
];

const Template = (args) => {
  return (
    <div>
      <Formik
        initialValues={{
          testField: null,
        }}
        onSubmit={() => {}}
      >
        {({ values }) => (
          <Form>
            <Field {...args} component={SelectField} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const SinglePick = Template.bind();

SinglePick.args = {
  name: 'testField',
  options: options,
  isMulti: false,
};

export const MultiPick = Template.bind();

MultiPick.args = {
  ...SinglePick.args,
  isMulti: true,
};
