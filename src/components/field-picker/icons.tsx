import {
  AtSign,
  Binary,
  CopyCheck,
  Disc,
  ListEnd,
  LucideProps,
  RemoveFormatting,
  SquareMenu,
} from "lucide-react";

import { FORM_FIELD_TYPES } from "./constants";
import { Form_Field_Types } from "./types";

interface Field_Icon_Props extends LucideProps {
  label?: string; // NOTE: Ensuring assistive tech can read the icon
  fieldType: Form_Field_Types;
}

const FieldIcon: React.FC<Field_Icon_Props> = ({
  label,
  fieldType,
  size = 32,
  ...props
}) => {
  switch (fieldType) {
    case FORM_FIELD_TYPES.TEXT_INPUT:
      return <RemoveFormatting aria-label={label} size={size} {...props} />;
    case FORM_FIELD_TYPES.NUMBER_INPUT:
      return <Binary aria-label={label} size={size} {...props} />;
    case FORM_FIELD_TYPES.EMAIL_INPUT:
      return <AtSign aria-label={label} size={size} {...props} />;
    case FORM_FIELD_TYPES.TEXTAREA:
      return <ListEnd aria-label={label} size={size} {...props} />;
    case FORM_FIELD_TYPES.SELECT_DROPDOWN:
      return <SquareMenu aria-label={label} size={size} {...props} />;
    case FORM_FIELD_TYPES.CHECKBOX:
      return <CopyCheck aria-label={label} size={size} {...props} />;
    case FORM_FIELD_TYPES.RADIO_BUTTON_GROUP:
      return <Disc aria-label={label} size={size} {...props} />;
    default:
      return null;
  }
};

export { FieldIcon };
