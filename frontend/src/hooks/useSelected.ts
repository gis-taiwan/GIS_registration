import { useState } from "react";

export type ISelected = {
  [id: string]: boolean;
};

export function useSelected() {
  const [selected, setSelected] = useState<ISelected>({});
  const selectOne = (key: string) => {
    setSelected({ ...selected, [key]: !selected[key] });
  };
  const selectAll = (value: boolean) => {
    setSelected(
      Object.keys(selected).reduce((obj: ISelected, key) => {
        obj[key] = value;
        return obj;
      }, {})
    );
  };
  const methods = {
    setSelected,
    selectOne,
    selectAll,
  };
  return [selected, methods] as const;
}
