export interface NxGenerator {
  name: string;
  form: NxGeneratorForm;
}

export interface NxGeneratorForm {
  checkboxes: ICheckbox[];
  dropDowns: IDropdown[];
  textInputs: ITextInput[];
}

export interface ICheckbox {
  name: string;
  label?: string;
  placeholder: string;
  isRequired: boolean;
  isChecked: boolean;
}

export interface IDropdown {
  name: string;
  label?: string;
  placeholder: string;
  isRequired: boolean;
  items: string[];
}

export interface ITextInput {
  name: string;
  label?: string;
  placeholder: string;
  isRequired: boolean;
  input: string;
}
