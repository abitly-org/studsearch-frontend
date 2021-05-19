import React, { useState } from "react";
import Item from "../Item";
import "../itemsWrapper.scss";
import InputImage from "../InputImage/InputImage";
import {useTranslation} from "react-i18next";
import { Cabinet } from "../../PersonalArea";
import { StudentPhoto } from "../../../../Components/StudentCard";

export default function PersonalDataInfo({
  refreshPhotoId,

  cabinet, uuid, setPhoto
}: {
  refreshPhotoId?: number,
    
  cabinet: Cabinet,
  // photo?: Blob | null
  uuid?: string,
  setPhoto?: (newPhoto: Blob | null) => void
}) {
  const { i18n, t } = useTranslation();

  // const url = React.useMemo(() => photo ? URL.createObjectURL(photo) : undefined, [ photo ]);

  return (
    <div className="wrapper-info">
      <InputImage
        img={uuid && <StudentPhoto key={refreshPhotoId} size={80} uuid={uuid} />}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e?.target?.files?.[0];
            setPhoto?.(file ?? null);
        }}
      />
      <Item title={t('cabinet-name')} itemData={cabinet?.name ?? ''} />
      <Item title={t('cabinet-gender')} itemData={t(`cabinet-gender-${cabinet?.gender ?? 'male'}`)} />
      <Item
        title={t('cabinet-about')}
        itemData={cabinet?.about ?? ''}
      />
    </div>
  );
}
