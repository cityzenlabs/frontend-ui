import React from "react";
import { Disclosure } from "@headlessui/react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";

function Accordian({ items }) {
  return (
    <div>
      <div className="mx-auto max-w-2xl bg-white p-2">
        {items.map((item, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-lg font-medium">
                  <span>{item.header}</span>
                  {open ? (
                    <MinusCircleIcon className="h-5 w-5 text-regal-blue" />
                  ) : (
                    <PlusCircleIcon className="h-5 w-5 text-regal-blue" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="font-light text-sm text-gray-500 text-left ml-4">
                  {item.body}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}

export default Accordian;
