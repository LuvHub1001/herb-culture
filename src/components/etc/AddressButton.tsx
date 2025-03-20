import { AddressData } from "../../lib/Address.ts";

function AddressButton() {
  return (
    <div className="flex mt-10 justify-center">
      <div className="grid grid-cols-10 gap-3">
        {AddressData.map((item) => {
          return (
            <div key={item.id}>
              <button className="cursor-pointer bg-gray-400 rounded-2xl w-20 text-white">
                {item.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AddressButton;
