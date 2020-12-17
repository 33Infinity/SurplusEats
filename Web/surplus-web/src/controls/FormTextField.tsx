import React from 'react';
import { TextValidator} from 'react-material-ui-form-validator';

  type formProps = {
    variant?: string,
    label?: string,
    name?: string,
    autoComplete?: string,
    type?: string,
    value?: string | undefined,
    required?: boolean,
    fullWidth?: boolean,
    autoFocus?: boolean,    
    validators?: Array<string>,
    errorMessages?: Array<string>   
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined              
  }

  const FormTextField: React.FC<formProps> = (props: Partial<formProps>) => {

    let controlProps: formProps = {
      variant: props.variant ?? "outlined",
      label: props.label ?? "",
      name: props.name ?? "",
      autoComplete: props.autoComplete ?? props.name,
      type: props.type ?? "",
      value: props.value ?? '',
      required: props.required ?? true,
      fullWidth: props.fullWidth ?? true,
      autoFocus: props.autoFocus ?? false,      
      validators: props.validators ?? undefined,
      errorMessages: props.errorMessages ?? undefined,
      onChange: props.onChange ?? undefined,
    };

    return (
      <>
        <TextValidator {...controlProps} />
      </>
    );
  };

export default FormTextField;