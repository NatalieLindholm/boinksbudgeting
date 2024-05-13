import { useState } from "react";
import { Listbox } from "@headlessui/react";

const category = [
  { id: 1, name: "Food", unavailable: false },
  { id: 2, name: "Hygien", unavailable: false },
  { id: 3, name: "Gas", unavailable: false },
];

export default function Categorylist() {
  const [selectedCategory, setSelectedCategory] = useState(category[0]);

  return (
    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
      <Listbox.Button>{selectedCategory.name}</Listbox.Button>
      <Listbox.Options>
        {category.map((category) => (
          <Listbox.Option
            key={category.id}
            value={category}
            disabled={category.unavailable}
          >
            {category.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
