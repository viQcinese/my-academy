import { useState } from "react";

type ReturnType<T> = [
  T[],
  (value: boolean, id: T) => void,
  (value: boolean) => void
];

export function useSelectMany<T>(entities: T[]): ReturnType<T> {
  const [selectedEntities, setSelectedEntities] = useState<T[]>([]);

  function onSelectOne(value: boolean, id: T) {
    setSelectedEntities((previous) =>
      value ? [...previous, id] : previous.filter((element) => element !== id)
    );
  }

  function onSelectMany(value: boolean) {
    setSelectedEntities(value ? entities : []);
  }

  return [selectedEntities, onSelectOne, onSelectMany];
}
