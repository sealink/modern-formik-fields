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
        {({ values, setFieldValue }) => (
          <Form>
            <Field {...args} component={SelectField} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const SinglePick = Template.bind();

class exampleForm {
  constructor(field) {
    this.field = field;
    this.fieldValue = this.field.value;
  }
  setFieldValue(fieldName, fieldValue) {
    this.fieldValue = fieldValue;
    return this.field.updateValue(fieldValue);
  }
}

class exampleField {
  constructor(value) {
    this.value = value;
    this.name = 'testField';
  }
  updateValue(value) {
    return (this.value = value);
  }
}

let singlePickFieldInstance = new exampleField('');
let singlePickFormInstance = new exampleForm(singlePickFieldInstance);

SinglePick.args = {
  id: 'testField',
  options: options,
  isMulti: false,
  form: singlePickFormInstance,
  field: singlePickFieldInstance,
};

export const MultiPick = Template.bind();

let multiPickFieldInstance = new exampleField([]);
let multiPickFormInstance = new exampleForm(multiPickFieldInstance);

MultiPick.args = {
  ...SinglePick.args,
  isMulti: true,
  form: multiPickFormInstance,
  field: multiPickFieldInstance,
};

export const AdditionalProps = Template.bind();

AdditionalProps.args = {
  ...SinglePick.args,
  inputValue: 'Custom Input Value',
};
