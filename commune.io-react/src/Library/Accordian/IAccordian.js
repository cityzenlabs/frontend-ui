import React from "react";
import { Disclosure } from "@headlessui/react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";

function Accordian({ items }) {
  return (
    <div className="px-4">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-2">
        {items.map((item, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-lg font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{item.header}</span>
                  {open ? (
                    <MinusCircleIcon className="h-5 w-5 text-regal-blue" />
                  ) : (
                    <PlusCircleIcon className="h-5 w-5 text-regal-blue" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 font-light text-sm text-gray-500">
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
