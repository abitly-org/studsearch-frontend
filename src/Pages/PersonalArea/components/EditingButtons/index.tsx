import React from "react";
import Button from "../../../../Components/Button";
import { useTranslation } from "react-i18next";

 export interface EditingButtonsProps {
  editingHandler: Function;
  saveChanges: Function;
}

export default function EditingButtons(props: EditingButtonsProps) {
  const { i18n, t } = useTranslation();
  const { editingHandler: setEditing, saveChanges } = props;
  return (
    <div className="btn-group">
      <Button
        children={t("cabinet-cancel")}
        outline={true}
        onClick={() => {
          setEditing();
        }}
      />
      <Button
        children={t("cabinet-save")}
        onClick={() => {
          saveChanges();
        }}
      />
    </div>
  );
}
