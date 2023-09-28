"use client";

import { Listbox } from "@headlessui/react";
import useSWR from "swr";
import { fetcher } from "@/constants";

interface SelectStateProps {
  onChange: (value: State) => void;
  value: State;
}

interface State {
  id: number;
  nome: string;
  sigla: string;
}

const SelectState = ({ value, onChange }: SelectStateProps) => {
  const { data: states } = useSWR<State[]>(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
    fetcher,
  );

  return (
    <div className="w-full">
      <Listbox as="div" className="space-y-4">
        <Listbox.Label>Selecione seu estado</Listbox.Label>

        <Listbox.Button
          as="button"
          className="block w-full rounded-md bg-light_primary px-4 py-2 text-black outline-none dark:bg-dark_secondary dark:text-light_primary"
        >
          {typeof value == "object"
            ? value.nome
            : value || "Selecione um estado"}
        </Listbox.Button>

        <Listbox.Options
          as="ul"
          className="max-h-60 overflow-y-auto rounded-md bg-light_primary px-4 text-black shadow-md outline-none scrollbar-thin scrollbar-track-light_primary dark:bg-dark_secondary dark:text-light_primary dark:scrollbar-track-dark_primary"
        >
          {states?.map((state) => (
            <Listbox.Option key={state.id} value={state}>
              {({ active, selected }) => (
                <li
                  className={`${
                    active && "opacity-50"
                  } relative cursor-pointer select-none px-4 py-2`}
                  onClick={() => onChange(state)}
                >
                  {state.nome} ({state.sigla})
                  {selected && (
                    <span
                      className={`${
                        active && "text-dark_secondary dark:text-light_primary"
                      } absolute inset-y-0 right-0 flex items-center pl-3`}
                    >
                      ✔
                    </span>
                  )}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default SelectState;
